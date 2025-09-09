// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;          // ISO string en frontmatter
  description: string;
  image?: string | null;
}

export interface PostData {
  meta: PostMeta;
  content: string;       // HTML sanitizado
}

// ——— helpers ———
function dirIfExists(...parts: string[]): string | null {
  const p = path.join(process.cwd(), ...parts);
  return fs.existsSync(p) ? p : null;
}

// Usar content/blog si existe; de lo contrario content/posts
const postsDirectory =
  dirIfExists("content", "blog") ??
  dirIfExists("content", "posts") ??
  path.join(process.cwd(), "content", "blog"); // default para el tipado

// Slugs disponibles
export function getAllSlugs(): string[] {
  if (!postsDirectory) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

// Meta de un post
export function getPostMeta(slug: string): PostMeta | null {
  try {
    const mdPath = path.join(postsDirectory!, `${slug}.md`);
    const mdxPath = path.join(postsDirectory!, `${slug}.mdx`);
    const filePath = fs.existsSync(mdPath) ? mdPath : mdxPath;
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

// Lista con meta ordenada (fecha desc)
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter((m): m is PostMeta => m !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Post completo con HTML (para .md simple)
export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const mdPath = path.join(postsDirectory!, `${slug}.md`);
    const mdxPath = path.join(postsDirectory!, `${slug}.mdx`);

    // Sólo procesamos a HTML los .md (no MDX). Si es .mdx, que lo renderice la página/MDX pipeline.
    const isMdx = fs.existsSync(mdxPath) && !fs.existsSync(mdPath);
    const srcPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
    const raw = fs.readFileSync(srcPath, "utf8");
    const { data, content } = matter(raw);

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };

    const clean = isMdx
      ? content // dejar el contenido MDX para que lo maneje el render MDX
      : sanitizeHtml(content, {
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

// Alias compat
export { getPostsMeta as getAllPosts };
