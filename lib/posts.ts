// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string | null;
};

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ---------- normalización de slug ----------
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function findFilenameForSlug(slug: string): string | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const bases = files.map((f) => f.replace(/\.md$/, ""));
  const wanted = decodeURIComponent(slug);

  // 1) coincidencia exacta
  let i = bases.findIndex((s) => s === wanted);
  if (i !== -1) return files[i];

  // 2) url-encoded
  i = bases.findIndex((s) => encodeURIComponent(s) === slug);
  if (i !== -1) return files[i];

  // 3) normalizado (sin acentos/espacios)
  const wantedNorm = normalize(wanted);
  i = bases.findIndex((s) => normalize(s) === wantedNorm);
  if (i !== -1) return files[i];

  return null;
}
// -------------------------------------------

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

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter((x): x is PostMeta => Boolean(x))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
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

// Alias por compatibilidad con imports previos
export { getPostsMeta as getAllPosts };