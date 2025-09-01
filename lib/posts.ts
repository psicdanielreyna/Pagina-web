// lib/posts.ts
import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  date: string;            // ISO: 2025-08-22
  excerpt?: string;
  cover?: string;          // ruta pública opcional
};

export type PostRecord = {
  slug: string;
  meta: PostMeta;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readFile(slug: string) {
  const withExt = slug.endsWith(".mdx") || slug.endsWith(".md")
    ? slug
    : `${slug}.mdx`;

  const full = path.join(POSTS_DIR, withExt);
  return fs.readFileSync(full, "utf8");
}

export function getAllPosts(): PostRecord[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const meta: PostMeta = {
      title: data.title ?? "Sin título",
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? "",
      cover: data.cover ?? "",
    };

    return {
      slug: file.replace(/\.mdx?$/, ""),
      meta,
      content,
    };
  });

  // Ordenar por fecha desc (si no hay fecha válida, van al final)
  return posts.sort((a, b) => {
    const da = new Date(a.meta.date).getTime() || 0;
    const db = new Date(b.meta.date).getTime() || 0;
    return db - da;
  });
}

export function getPostBySlug(slug: string): PostRecord | null {
  try {
    const raw = readFile(slug);
    const { data, content } = matter(raw);

    return {
      slug: slug.replace(/\.mdx?$/, ""),
      meta: {
        title: data.title ?? "Sin título",
        date: data.date ?? "1970-01-01",
        excerpt: data.excerpt ?? "",
        cover: data.cover ?? "",
      },
      content,
    };
  } catch {
    return null;
  }
}
