// lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  title: string;
  slug: string;
  date?: string;
  excerpt?: string;
  /** ✅ para la imagen de portada opcional */
  cover?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(POSTS_DIR);

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .map(async (filename) => {
        const filePath = path.join(POSTS_DIR, filename);
        const raw = await fs.readFile(filePath, "utf8");
        const { data } = matter(raw);

        const slug = filename.replace(/\.mdx?$/, "");

        return {
          title: data.title ?? slug,
          slug,
          date: data.date ?? undefined,
          excerpt: data.excerpt ?? undefined,
          /** ✅ traer cover del front-matter si existe */
          cover: data.cover ?? undefined,
        } as PostMeta;
      })
  );

  // orden por fecha desc (si falta date, va al final)
  const toTime = (d?: string) => (d ? new Date(d).getTime() : 0);
  return posts.sort((a, b) => (toTime(a.date) < toTime(b.date) ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  const filePath = await fs
    .stat(mdxPath)
    .then(() => mdxPath)
    .catch(() => mdPath);

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const meta: PostMeta = {
    title: data.title ?? slug,
    slug,
    date: data.date ?? undefined,
    excerpt: data.excerpt ?? undefined,
    cover: data.cover ?? undefined, // ✅
  };

  return { meta, content };
}