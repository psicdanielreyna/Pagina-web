// lib/posts.ts
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;            // YYYY-MM-DD o ISO
  description?: string;
  image?: string | null;
};

export type PostData = {
  meta: PostMeta;
  content: string;         // HTML seguro (sanitizado)
};

// Carpeta donde viven los .md
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Helpers
function mdFile(slug: string) {
  return path.join(POSTS_DIR, `${slug}.md`);
}

function fileToSlug(filename: string) {
  return filename.replace(/\.md$/i, "");
}

/** Slugs síncronos: útil para generateStaticParams() */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith(".md"))
    .map((d) => fileToSlug(d.name));
}

/** Lee un post (MD) y regresa { content, data } */
async function getPostContent(slug: string): Promise<{ content: string; data: any }> {
  const full = mdFile(slug);
  const raw = await fsp.readFile(full, "utf8");
  const { content, data } = matter(raw);
  return { content, data };
}

/** Deriva solo los metadatos de un slug */
export function getPostMeta(slug: string): PostMeta | null {
  try {
    const raw = fs.readFileSync(mdFile(slug), "utf8");
    const { data } = matter(raw);

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };
    return meta;
  } catch {
    return null;
  }
}

/** Lista de posts con metadata, ordenada desc por fecha */
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter(Boolean) as PostMeta[]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Post completo con HTML sanitizado */
export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const { content, data } = await getPostContent(slug);

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };

    // Si en el CMS pegas HTML, lo limpiamos.
    // (Si algún día conviertes Markdown->HTML, reemplaza `content` por el HTML renderizado)
    const clean = sanitizeHtml(content, {
      allowedAttributes: { "*": ["class", "id", "style"] },
      transformTags: {
        a: (tagName: string, attribs: any) => ({
          tagName,
          attribs: { rel: "noopener noreferrer", ...attribs },
        }),
      },
    });

    return { meta, content: clean };
  } catch {
    return null;
  }
}

/** Alias por compatibilidad con imports antiguos */
export { getPostsMeta as getAllPosts };