// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;            // YYYY-MM-DD
  description?: string;
  image?: string | null;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf-8");
  return matter(file); // { data, content }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const { data } = readPost(slug);

  if (!data?.title || !data?.date) {
    return null;
  }

  return {
    slug,
    title: String(data.title),
    date: String(data.date),
    description: data.description ? String(data.description) : undefined,
    image: data.image ? String(data.image) : null,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter((p): p is PostMeta => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(
  slug: string
): Promise<PostMeta & { html: string; content: string }> {
  const { data, content } = readPost(slug);

  const meta: PostMeta = {
    slug,
    title: String(data?.title ?? slug),
    date: String(data?.date ?? ""),
    description: data?.description ? String(data.description) : undefined,
    image: data?.image ? String(data.image) : null,
  };

  // Markdown → HTML
  const html = marked.parse(content) as string;

  return { ...meta, html, content };
}