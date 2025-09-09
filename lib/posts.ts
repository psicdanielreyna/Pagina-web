import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

export interface PostMeta {
  slug: string;       // slug normalizado (sin acentos/signos)
  title: string;
  date: string;
  description: string;
  image?: string | null;
}
export interface PostData {
  meta: PostMeta;
  content: string;    // HTML sanitizado
}

const postsDir = path.join(process.cwd(), "content", "blog");

// Normaliza: quita acentos, elimina signos raros, pasa a kebab-case
function normalizeSlug(input: string): string {
  const noExt = input.replace(/\.md$/i, "");
  return noExt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")     // diacríticos
    .replace(/[^a-zA-Z0-9\s-]/g, "")     // signos
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

// Devuelve un mapa { slugNormalizado -> nombreArchivoReal.md }
function buildSlugMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith(".md")) continue;
    const norm = normalizeSlug(file);
    map[norm] = file; // guardamos el nombre real
  }
  return map;
}

export function getAllSlugs(): string[] {
  const map = buildSlugMap();
  return Object.keys(map);
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const map = buildSlugMap();
    const realFile = map[normalizeSlug(slug)];
    if (!realFile) return null;

    const filePath = path.join(postsDir, realFile);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    return {
      slug: normalizeSlug(slug),
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };
  } catch {
    return null;
  }
}

export function getPostsMeta(): PostMeta[] {
  const map = buildSlugMap();
  return Object.entries(map)
    .map(([norm]) => getPostMeta(norm))
    .filter((m): m is PostMeta => m !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const map = buildSlugMap();
    const realFile = map[normalizeSlug(slug)];
    if (!realFile) return null;

    const filePath = path.join(postsDir, realFile);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content: md } = matter(raw);

    const html = marked.parse(md);
    const clean = sanitizeHtml(html as string, {
      allowedTags: [
        "h1","h2","h3","h4","h5","h6","p","blockquote","hr",
        "ul","ol","li","strong","em","del","code","pre","a","img","br"
      ],
      allowedAttributes: {
        a: ["href","title","target","rel"],
        img: ["src","alt","title","width","height"],
      },
      transformTags: {
        a: (tag, attrs) => ({
          tagName: "a",
          attribs: { rel: "noopener noreferrer", target: "_blank", ...attrs },
        }),
      },
    });

    const meta: PostMeta = {
      slug: normalizeSlug(slug),
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };

    return { meta, content: clean };
  } catch {
    return null;
  }
}

export { getPostsMeta as getAllPosts };
