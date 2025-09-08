import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

// Tipos
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string | null;
}

export interface PostData {
  meta: PostMeta;
  content: string; // Contenido en HTML limpio
}

const postsDirectory = path.join(process.cwd(), "content/posts");

// Lee todos los slugs
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Obtiene metadata de un post
export function getPostMeta(slug: string): PostMeta | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };
}

// Obtiene metadata de todos los posts ordenados por fecha
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Obtiene post completo con HTML renderizado
export async function getPostHtml(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Markdown -> HTML
  const rawHtml = marked(content);

  // Sanitizar HTML
  const clean = sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });

  const meta: PostMeta = {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };

  return { meta, content: clean };
}

// Alias por compatibilidad
export { getPostsMeta as getAllPosts };