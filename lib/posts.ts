// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;            // YYYY-MM-DD
  description?: string;
  image?: string | null;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const fp = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) return null;

  const { data } = matter(fs.readFileSync(fp, "utf8"));

  // Normaliza fecha: acepta ISO con hora y devuelve YYYY-MM-DD
  const iso = data?.date ? new Date(String(data.date)) : null;
  const date = iso && !isNaN(iso.getTime())
    ? iso.toISOString().slice(0, 10)
    : "1970-01-01";

  return {
    slug,
    title: data?.title ?? slug,
    date,
    description: data?.description ?? "",
    image: data?.image ? String(data.image) : null,
  };
}

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter(Boolean) as PostMeta[]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<{
  meta: PostMeta;
  html: string;
}> {
  const fp = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) throw new Error(`Post not found: ${slug}`);

  const raw = fs.readFileSync(fp, "utf8");
  const { content } = matter(raw);
  const meta = getPostMeta(slug);
  if (!meta) throw new Error(`Invalid front-matter: ${slug}`);

  // Si usas remark/rehype, deja tu pipeline aquí; por ahora, devolvemos tal cual:
  return { meta, html: content };
}