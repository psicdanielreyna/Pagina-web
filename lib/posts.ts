import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string;
};

const postsDir = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const full = path.join(postsDir, `${slug}.md`);
  const fullMdx = path.join(postsDir, `${slug}.mdx`);
  const filepath = fs.existsSync(full) ? full : fs.existsSync(fullMdx) ? fullMdx : null;
  if (!filepath) return null;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
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
  const full = path.join(postsDir, `${slug}.md`);
  const fullMdx = path.join(postsDir, `${slug}.mdx`);
  const filepath = fs.existsSync(full) ? full : fs.existsSync(fullMdx) ? fullMdx : null;
  if (!filepath) throw new Error(`Post not found: ${slug}`);

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
  };

  return { meta, html: contentHtml };
}