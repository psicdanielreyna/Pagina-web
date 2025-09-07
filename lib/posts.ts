import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO o YYYY-MM-DD
};

function mdPathFor(slug: string): string | null {
  const md = path.join(POSTS_DIR, `${slug}.md`);
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(md)) return md;
  if (fs.existsSync(mdx)) return mdx;
  return null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = mdPathFor(slug);
  if (!filePath) return null;

  const { data } = matter.read(filePath);
  const date =
    data.date instanceof Date ? data.date.toISOString() : (data.date ?? "");

  return {
    slug,
    title: data.title ?? slug,
    date,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter((v): v is PostMeta => Boolean(v))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(
  slug: string
): Promise<{ meta: PostMeta; html: string }> {
  const filePath = mdPathFor(slug);
  if (!filePath) {
    throw new Error(`Post not found: ${slug}`);
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const htmlString = processed.toString();

  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date:
      data.date instanceof Date ? data.date.toISOString() : (data.date ?? ""),
  };

  return { meta, html: htmlString };
}