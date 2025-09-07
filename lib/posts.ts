// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// normaliza acentos y signos para comparar
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita diacríticos
    .replace(/[^\w-]+/g, "-")        // espacios y signos → guiones
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function findFilenameForSlug(slug: string): string | null {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const fileSlugs = files.map((f) => f.replace(/\.md$/, ""));

  const wanted = decodeURIComponent(slug);

  // 1) match directo
  let idx = fileSlugs.findIndex((s) => s === wanted);
  if (idx !== -1) return files[idx];

  // 2) match contra versión URL-encoded
  idx = fileSlugs.findIndex((s) => encodeURIComponent(s) === slug);
  if (idx !== -1) return files[idx];

  // 3) match normalizado (sin acentos/signos)
  const wantedNorm = normalize(wanted);
  idx = fileSlugs.findIndex((s) => normalize(s) === wantedNorm);
  if (idx !== -1) return files[idx];

  return null;
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string | null;
};

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter(Boolean) as PostMeta[]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMeta(slug: string): PostMeta | null {
  const filename = findFilenameForSlug(slug);
  if (!filename) return null;
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data } = matter(raw);
  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };
}

export async function getPostHtml(
  slug: string
): Promise<{ meta: PostMeta; content: string }> {
  const filename = findFilenameForSlug(slug);
  if (!filename) throw new Error(`No se encontró el post: ${slug}`);
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug: filename.replace(/\.md$/, ""),
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };
  return { meta, content };
}

// alias para imports viejos
export { getPostsMeta as getAllPosts };