// lib/posts.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { slugify, normalizeSlug } from "./slug";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string | null;
};

export type PostData = {
  meta: PostMeta;
  content: string;
};

function fileSlug(file: string) {
  const base = file.replace(/\.mdx?$/i, "");
  return slugify(base);
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const files = await fs.readdir(POSTS_DIR);
  const metas: PostMeta[] = [];

  for (const file of files.filter(f => /\.mdx?$/i.test(f))) {
    const full = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(full, "utf8");
    const { data } = matter(raw);

    // Prioriza slug del frontmatter; si no, el nombre del archivo
    const rawSlug: string = (data.slug as string) ?? fileSlug(file);
    const slug = slugify(rawSlug);

    metas.push({
      slug,
      title: String(data.title ?? slug),
      date: data.date ? String(data.date) : undefined,
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
      cover: data.cover ? String(data.cover) : null,
    });
  }

  // más recientes primero si hay fecha
  metas.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return metas;
}

export async function getPostBySlug(slugInput: string): Promise<PostData | null> {
  const target = normalizeSlug(slugInput);
  const files = await fs.readdir(POSTS_DIR);

  for (const file of files.filter(f => /\.mdx?$/i.test(f))) {
    const full = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(full, "utf8");
    const parsed = matter(raw);

    const fmSlug = parsed.data.slug ? slugify(String(parsed.data.slug)) : fileSlug(file);
    if (fmSlug === target) {
      const meta: PostMeta = {
        slug: fmSlug,
        title: String(parsed.data.title ?? fmSlug),
        date: parsed.data.date ? String(parsed.data.date) : undefined,
        excerpt: parsed.data.excerpt ? String(parsed.data.excerpt) : undefined,
        cover: parsed.data.cover ? String(parsed.data.cover) : null,
      };
      return { meta, content: parsed.content };
    }
  }
  return null;
}
