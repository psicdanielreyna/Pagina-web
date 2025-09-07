// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // YYYY-MM-DD
  description?: string;
  image?: string | null;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function readPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const filePathMdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const finalPath = fs.existsSync(filePath) ? filePath : filePathMdx;
  const raw = fs.readFileSync(finalPath, "utf8");
  return matter(raw); // { data, content }
}

export function getPostMeta(slug: string): PostMeta | null {
  const { data } = readPost(slug);

  // defensivo: si no hay título/fecha, lo saltamos
  if (!data?.title || !data?.date) return null;

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    description: data.description ? String(data.description) : undefined,
    image: data.image ? String(data.image) : null,
  };
}

export function getPostsMeta(): PostMeta[] {
  const posts = getAllSlugs()
    .map(getPostMeta)
    .filter(Boolean) as PostMeta[];

  // Tipar el comparador evita los “any implícitos”
  posts.sort((a: PostMeta, b: PostMeta) => (a.date < b.date ? 1 : -1));
  return posts;
}

// Si tu página de detalle usa HTML ya renderizado, aquí puedes
// convertir Markdown->HTML. Por ahora regresamos el markdown crudo.
export async function getPostHtml(
  slug: string
): Promise<{ meta: PostMeta; content: string }> {
  const file = readPost(slug);
  const meta = getPostMeta(slug);

  if (!meta) {
    throw new Error(`Post inválido o sin metadatos: ${slug}`);
  }

  // Si luego agregas un renderer MD->HTML, reemplaza `content` por `html`
  return {
    meta,
    content: file.content,
  };
}

// Alias opcional para compatibilidad con imports antiguos
export const getAllPosts = getPostsMeta;