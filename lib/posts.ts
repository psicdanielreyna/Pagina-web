// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // YYYY-MM-DD o ISO
  description?: string;
  image?: string | null;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readFile(slug: string) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  return fs.readFileSync(file, "utf8");
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const raw = readFile(slug);
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };
  } catch {
    return null;
  }
}

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter(Boolean) as PostMeta[]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<{
  meta: PostMeta;
  content: string;
}> {
  const raw = readFile(slug);
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };
  // si luego conviertes MD→HTML, reemplaza 'content' por el HTML renderizado
  return { meta, content };
}

// alias por si quedaban imports antiguos
export { getPostsMeta as getAllPosts };