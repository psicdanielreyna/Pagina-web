import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

// remark/rehype p/ convertir MD -> HTML
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string | null;
}

export interface PostData {
  meta: PostMeta;
  content: string; // HTML limpio
}

// Ruta donde están los posts
const postsDirectory = path.join(process.cwd(), "content", "posts");

// ------------- utilidades -------------
function getPostFilePath(slug: string) {
  return path.join(postsDirectory, `${slug}.md`);
}

async function mdToHtml(md: string): Promise<string> {
  const file = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);

  const html = String(file);

  // Sanitiza el HTML resultante
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });
}

// --------------------------------------

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
    const fileContents = fs.readFileSync(getPostFilePath(slug), "utf8");
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

// Obtener post completo con HTML ya renderizado
export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const fileContents = fs.readFileSync(getPostFilePath(slug), "utf8");
    const { data, content: md } = matter(fileContents);

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };

    const html = await mdToHtml(md);
    return { meta, content: html };
  } catch {
    return null;
  }
}

// Alias para compatibilidad
export { getPostsMeta as getAllPosts };