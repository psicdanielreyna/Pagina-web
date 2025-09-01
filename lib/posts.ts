// lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date?: string;       // ISO yyyy-mm-dd
  excerpt?: string;
  cover?: string;
  slug: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function normalizeDate(d?: string) {
  if (!d) return undefined;
  // Acepta "2025-08-22" o ISO; normaliza a yyyy-mm-dd
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return undefined;
  return dt.toISOString().slice(0, 10);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const entries = await fs.readdir(POSTS_DIR);
  const files = entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    const full = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(full, "utf8");
    const { data } = matter(raw);

    posts.push({
      title: data.title ?? slug,
      date: normalizeDate(data.date),
      excerpt: data.excerpt ?? "",
      cover: data.cover ?? "",
      slug,
    });
  }

  // Ordena por fecha desc (los sin fecha al final)
  posts.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date > b.date ? -1 : 1;
  });

  return posts;
}

export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta;
  content: string; // markdown crudo
}> {
  const tryPaths = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
  ];

  let filePath: string | null = null;
  for (const p of tryPaths) {
    try {
      await fs.access(p);
      filePath = p;
      break;
    } catch {
      /* continue */
    }
  }

  if (!filePath) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    title: data.title ?? slug,
    date: normalizeDate(data.date),
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? "",
    slug,
  };

  return { meta, content };
}
