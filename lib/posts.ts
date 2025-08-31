// lib/posts.ts
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;     // ISO string en frontmatter
  excerpt?: string;
  cover?: string;
};

export type Post = {
  meta: PostMeta;
  content: React.ReactNode;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

async function listFiles(): Promise<string[]> {
  try {
    const all = await fs.readdir(POSTS_DIR);
    return all.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await listFiles();

  const metas = await Promise.all(
    files.map(async (file) => {
      const full = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(full);

      const slug = file.replace(/\.mdx$/, "");
      const title = String(data.title ?? slug);
      const date = String(data.date ?? "");
      const excerpt = data.excerpt ? String(data.excerpt) : undefined;
      const cover = data.cover ? String(data.cover) : undefined;

      return { slug, title, date, excerpt, cover } as PostMeta;
    })
  );

  // ordena por fecha desc; si no hay fecha válida, lo manda abajo
  return metas.sort((a, b) => {
    const da = Date.parse(a.date || "");
    const db = Date.parse(b.date || "");
    if (isNaN(da) && isNaN(db)) return 0;
    if (isNaN(da)) return 1;
    if (isNaN(db)) return -1;
    return db - da;
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(source);

    const mdx = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });

    const meta: PostMeta = {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: data.excerpt ? String(data.excerpt) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
    };

    return { meta, content: mdx.content };
  } catch {
    return null;
  }
}
