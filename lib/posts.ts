import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

// Ruta donde están los posts
const postsDirectory = path.join(process.cwd(), "content/blog");

// Tipos
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string | null;
};

export type PostData = {
  meta: PostMeta;
  content: string;
};

// Obtener todos los slugs
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Obtener metadata de un post por slug
export function getPostMeta(slug: string): PostMeta | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? "Sin título",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };
}

// Listado de posts ordenados por fecha
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((meta): meta is PostMeta => meta !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Obtener contenido completo de un post
export async function getPostHtml(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const meta: PostMeta = {
    slug,
    title: data.title ?? "Sin título",
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
  };

  // Sanitizar contenido (en caso de que haya HTML dentro del MD)
  const clean = sanitizeHtml(content, {
    allowedAttributes: {
      "*": ["class", "id", "style"],
    },
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName,
          attribs: { rel: "noopener noreferrer", ...attribs },
        };
      },
    },
  });

  return { meta, content: clean };
}

// Alias por compatibilidad
export { getPostsMeta as getAllPosts }; 