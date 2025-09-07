// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/** Dónde viven los posts en Markdown */
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/** Tipo de metadatos que usamos en la app */
export type PostMeta = {
  slug: string;
  title: string;
  date: string;           // ISO YYYY-MM-DD o similar
  description?: string;
  image?: string | null;  // ruta pública (ej. /uploads/...)
};

/** Lee todos los archivos .md / .mdx y devuelve sus slugs (sin extensión) */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** Lee un archivo de post por slug y devuelve { content, data(frontmatter) } */
function getPostContent(slug: string): { content: string; data: Record<string, any> } {
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);

  let filePath = "";
  if (fs.existsSync(mdPath)) filePath = mdPath;
  else if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else throw new Error(`No se encontró el post: ${slug}`);

  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, data };
}

/** Extrae metadatos seguros de un slug. Si falta título/fecha, puede devolver null. */
export function getPostMeta(slug: string): PostMeta | null {
  try {
    const { data } = getPostContent(slug);
    const title = (data.title ?? "").toString().trim();
    const date = (data.date ?? "").toString().trim();

    if (!title || !date) return null;

    const description = data.description ? String(data.description) : undefined;
    const image = data.image ? String(data.image) : null;

    return { slug, title, date, description, image };
  } catch {
    return null;
  }
}

/** Lista de posts ordenada por fecha desc */
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Devuelve metadatos + contenido en texto (Markdown crudo) para un slug */
export async function getPostHtml(
  slug: string
): Promise<{ meta: PostMeta; content: string }> {
  const { content, data } = getPostContent(slug);

  const meta: PostMeta = {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };

  // Si más adelante renderizas Markdown a HTML, cambia `content` por el HTML.
  return { meta, content };
}

/** Aliases por compatibilidad con imports anteriores */
export { getPostsMeta as getAllPosts };