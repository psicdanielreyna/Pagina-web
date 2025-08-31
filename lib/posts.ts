// lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontMatter = {
  title: string;
  slug?: string;
  date?: string;          // "YYYY-MM-DD"
  excerpt?: string;
  cover?: string;
  draft?: boolean;
};

export async function getSlugs() {
  const files = await fs.readdir(POSTS_DIR);
  return files
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export async function getPostBySlug(slug: string) {
  const fullPathMDX = path.join(POSTS_DIR, `${slug}.mdx`);
  const fullPathMD = path.join(POSTS_DIR, `${slug}.md`);

  // soporta .mdx y .md
  let filePath = fullPathMDX;
  try { await fs.access(filePath); } 
  catch { filePath = fullPathMD; }

  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontMatter>;

  return {
    slug,
    frontMatter: {
      title: fm.title ?? slug,
      slug: fm.slug ?? slug,
      date: fm.date ?? undefined,
      excerpt: fm.excerpt ?? "",
      cover: fm.cover ?? "",
      draft: fm.draft ?? false,
    },
    content,
  };
}

export async function getAllPosts() {
  const slugs = await getSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts
    .filter((p) => !p.frontMatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date ?? 0).getTime() -
        new Date(a.frontMatter.date ?? 0).getTime()
    );
}
