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

// Ruta donde están los posts
const postsDirectory = path.join(process.cwd(), "content", "posts");

// Obtener todos los slugs de los posts
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Extraer metadata de un post
export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

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

// Listar todos los posts con metadata
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Obtener post completo con HTML
export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

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

// Alias para compatibilidad
export { getPostsMeta as getAllPosts };