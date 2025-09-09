import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string | null;
}

export interface PostData {
  meta: PostMeta;
  content: string; // HTML sanitizado
}

// 👉 ajusta si tus archivos viven en content/blog
const postsDirectory = path.join(process.cwd(), "content", "blog");

// Slugs
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// Meta de un post
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

// Lista de posts (ordenados desc por fecha)
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter((m): m is PostMeta => m !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Post completo con HTML (Markdown -> HTML -> sanitize)
export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content: md } = matter(raw);

    // 1) Markdown -> HTML
    const html = marked.parse(md);

    // 2) Sanitizar (permitimos headings, listas, enlaces, imágenes, etc.)
    const clean = sanitizeHtml(html as string, {
      allowedTags: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "blockquote", "hr",
        "ul", "ol", "li",
        "strong", "em", "del", "code", "pre",
        "a", "img", "br",
      ],
      allowedAttributes: {
        a: ["href", "title", "target", "rel"],
        img: ["src", "alt", "title", "width", "height"],
      },
      transformTags: {
        a: (tagName, attribs) => ({
          tagName,
          attribs: { rel: "noopener noreferrer", target: "_blank", ...attribs },
        }),
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
  } catch {
    return null;
  }
}

// Alias (por compatibilidad)
export { getPostsMeta as getAllPosts };
