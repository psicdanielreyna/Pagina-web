import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string | null;
}

export interface PostData {
  meta: PostMeta;
  content: string;
}

// Ruta de los markdowns
const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };
  } catch {
    return null;
  }
}

export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter((m): m is PostMeta => m !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };

    const clean = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt"],
      },
    });

    return { meta, content: clean };
  } catch {
    return null;
  }
}

export { getPostsMeta as getAllPosts };
