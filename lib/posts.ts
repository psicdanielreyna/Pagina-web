// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;            // ← string, no Date
  description?: string;
  image?: string | null;
};

export type PostData = { meta: PostMeta; content: string };

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data } = matter(fs.readFileSync(file, "utf8"));

  // normalizamos fecha a ISO string
  const iso = data?.date
    ? new Date(data.date as string).toISOString()
    : "";

  return {
    slug,
    title: data?.title ?? "",
    date: iso,
    description: data?.description ?? "",
    image: data?.image ?? null,
  };
}

export function getPostsMeta(): PostMeta[] {
  return (
    getAllSlugs()
      .map((s) => getPostMeta(s))
      .filter((meta): meta is PostMeta => meta !== null) // type guard
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  );
}

export async function getPostHtml(slug: string): Promise<PostData | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  const meta: PostMeta = {
    slug,
    title: data?.title ?? "",
    date: data?.date ? new Date(data.date as string).toISOString() : "",
    description: data?.description ?? "",
    image: data?.image ?? null,
  };

  const clean = sanitizeHtml(content, {
    allowedAttributes: { "*": ["class", "id", "style"] },
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { rel: "noopener noreferrer", ...attribs },
      }),
    },
  });

  return { meta, content: clean };
}

// alias por compatibilidad con imports antiguos
export { getPostsMeta as getAllPosts };