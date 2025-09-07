// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;           // ISO string en el frontmatter
  description?: string;   // opcional
  image?: string;         // opcional (ruta absoluta o /uploads/…)
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

// Lee todos los archivos .md (o .mdx si cambias la extensión)
function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function getPostMeta(slug: string): PostMeta | null {
  const fullPathMd = path.join(POSTS_DIR, `${slug}.md`);
  const fullPathMdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;

  if (!fs.existsSync(fullPath)) return null;

  const file = fs.readFileSync(fullPath, "utf-8");
  const { data } = matter(file);

  // title y date son lo mínimo para listar; si falta title, descartamos
  if (!data?.title) return null;

  return {
    slug,
    title: String(data.title),
    date: data.date ? String(data.date) : "",
    description: data.description ? String(data.description) : undefined,
    image: data.image ? String(data.image) : undefined,
  };
}

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<{
  meta: PostMeta;
  html: string;
}> {
  const fullPathMd = path.join(POSTS_DIR, `${slug}.md`);
  const fullPathMdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;

  if (!fs.existsSync(fullPath)) {
    throw new Error(`No existe el post: ${slug}`);
  }

  const file = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(file);

  const meta: PostMeta = {
    slug,
    title: String(data.title ?? ""),
    date: data.date ? String(data.date) : "",
    description: data.description ? String(data.description) : undefined,
    image: data.image ? String(data.image) : undefined,
  };

  // Convierte Markdown → HTML (con tablas, listas, etc. de GFM)
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const html = processed.toString();

  return { meta, html };
}