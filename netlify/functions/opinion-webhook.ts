// netlify/functions/opinion-webhook.ts
import type { Handler } from "@netlify/functions";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const SECRET = process.env.OPINION_WEBHOOK_SECRET || "";

type Incoming = {
  initials?: string;
  type?: "therapy" | "ebook";
  ebookSlug?: string;
  rating?: string | number;
  text?: string;
  // Formspree suele mandar otros campos; no los necesitamos
};

// formatea TS del archivo completo con nueva opinión
function renderOpinionesTs(existing: string, newObj: string) {
  // si el archivo ya existe, insertamos el objeto antes del cierre de `];`
  const marker = "export const opiniones: Opinion[] = [";
  const i = existing.indexOf(marker);
  if (i === -1) {
    // archivo inexistente/otro formato: devolvemos base mínima
    return `export type Opinion = {
  initials: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  type: "therapy" | "ebook";
  ebookSlug?: "como-apagar-la-mente" | "el-arte-de-creer-en-ti";
  text: string;
};

export const opiniones: Opinion[] = [
  ${newObj}
];\n`;
  }
  const j = existing.lastIndexOf("];");
  if (j === -1) {
    // formato raro: reconstruir
    return existing + `\n\n// Fallback append\nopiniones.push(${newObj});\n`;
  }

  const before = existing.slice(0, j);
  const after = existing.slice(j);
  const needsComma = before.trim().endsWith("[") ? "" : ",";
  return `${before}${needsComma}
  ${newObj}
${after}`;
}

async function githubRequest(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${path} ${res.status}: ${text}`);
  }
  return res;
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // seguridad opcional por cabecera
    const sig = event.headers["x-opinion-signature"] || "";
    if (SECRET && sig !== SECRET) {
      return { statusCode: 401, body: "Invalid signature" };
    }

    const body: Incoming = event.body ? JSON.parse(event.body) : {};
    // Formspree envia x-www-form-urlencoded por default; si ves `event.body` raw,
    // cambia el form para usar `enctype="application/json"` o parsea `URLSearchParams`.

    const now = new Date();
    const date = now.toISOString().slice(0, 10);

    const initials = (body.initials || "").trim().toUpperCase();
    const type = body.type === "ebook" ? "ebook" : "therapy";
    const ebookSlug = type === "ebook" ? (body.ebookSlug || "").trim() : undefined;
    const rating = Math.max(1, Math.min(5, Number(body.rating) || 5)) as 1 | 2 | 3 | 4 | 5;
    const text = (body.text || "").trim();

    if (!initials || !text) {
      return { statusCode: 400, body: "Missing initials or text" };
    }

    // 1) lee el archivo actual
    const path = "data/opiniones.ts";
    let sha: string | undefined;
    let existing = "";
    try {
      const res = await githubRequest(`/contents/${path}`);
      const json = await res.json();
      sha = json.sha;
      existing = Buffer.from(json.content, "base64").toString("utf-8");
    } catch (_e) {
      // archivo no existe; seguimos con existing vacío
      existing = "";
    }

    // 2) crea el objeto TS
    const newObj = `{
    initials: ${JSON.stringify(initials)},
    date: ${JSON.stringify(date)},
    rating: ${rating},
    type: ${JSON.stringify(type)}${ebookSlug ? `,\n    ebookSlug: ${JSON.stringify(ebookSlug)}` : ""},
    text: ${JSON.stringify(text)}
  }`;

    // 3) renderiza el nuevo contenido
    const updated = renderOpinionesTs(existing, newObj);

    // 4) crea branch + PR
    const baseBranch = "main";
    const branchName = `opiniones/${date}-${Date.now()}`;

    // base ref
    const baseRefRes = await githubRequest(`/git/ref/heads/${baseBranch}`);
    const { object: baseObj } = await baseRefRes.json() as any;

    // crea ref
    await githubRequest(`/git/refs`, {
      method: "POST",
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseObj.sha }),
    });

    // sube blob
    const blobRes = await githubRequest(`/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: updated, encoding: "utf-8" }),
    });
    const blob = await blobRes.json() as any;

    // lee árbol del head del branch
    const treeRes = await githubRequest(`/git/trees/${baseObj.sha}`);
    const tree = await treeRes.json() as any;

    // crea nuevo árbol con nuestro archivo
    const newTreeRes = await githubRequest(`/git/trees`, {
      method: "POST",
      body: JSON.stringify({
        base_tree: tree.sha,
        tree: [
          {
            path,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
          },
        ],
      }),
    });
    const newTree = await newTreeRes.json() as any;

    // commit
    const commitRes = await githubRequest(`/git/commits`, {
      method: "POST",
      body: JSON.stringify({
        message: `opiniones: agrega "${initials}" (${type}${ebookSlug ? ` · ${ebookSlug}` : ""})`,
        tree: newTree.sha,
        parents: [baseObj.sha],
      }),
    });
    const commit = await commitRes.json() as any;

    // mueve el branch al nuevo commit
    await githubRequest(`/git/refs/heads/${branchName}`, {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.sha, force: true }),
    });

    // crea PR
    const prTitle = `Opinión: ${initials} (${type}${ebookSlug ? ` · ${ebookSlug}` : ""})`;
    const prRes = await githubRequest(`/pulls`, {
      method: "POST",
      body: JSON.stringify({
        title: prTitle,
        head: branchName,
        base: baseBranch,
        body: `Nueva opinión vía webhook.\n\n- **Iniciales:** ${initials}\n- **Tipo:** ${type}\n- **Ebook:** ${ebookSlug || "-"}\n- **Rating:** ${rating}\n- **Fecha:** ${date}\n`,
      }),
    });
    const pr = await prRes.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, pr: pr.html_url }),
    };
  } catch (e: any) {
    return { statusCode: 500, body: `Error: ${e.message}` };
  }
};