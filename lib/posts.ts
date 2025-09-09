import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;          // guardamos como string (ISO o “YYYY-MM-DD”)
  description: string;
  image?: string | null; // ruta absoluta o relativa
}

export interface PostData {
  meta: PostMeta;
  content: string;       // HTML limpio
}

// Carpeta de posts Markdown
const postsDirectory = path.join(process.cwd(), "content", "posts");

// 1) Slugs disponibles
export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// 2) Metadata de un post
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

// 3) Lista de posts (solo metadata), ordenados por fecha desc
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostMeta(slug))
    .filter((m): m is PostMeta => m !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 4) Post completo como HTML (con saneado + transformTags)
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
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: [
          "src",
          "alt",
          "width",
          "height",
          "loading",
          "decoding",
          "sizes",
          "srcset",
          "fetchpriority",
          "referrerpolicy",
          "class",
        ],
        iframe: ["src", "title", "allow", "allowfullscreen", "loading", "referrerpolicy"],
        a: ["href", "title", "rel", "target"],
      },
      transformTags: {
        img: (tagName, attribs) => ({
          tagName: "img",
          attribs: {
            ...attribs,
            loading: attribs.loading ?? "lazy",
            decoding: attribs.decoding ?? "async",
            fetchpriority: attribs.fetchpriority ?? "low",
            referrerpolicy: attribs.referrerpolicy ?? "no-referrer",
            sizes: attribs.sizes ?? "(min-width: 1024px) 960px, 100vw",
            class: (attribs.class ?? "") + " rounded-xl",
          },
        }),
        iframe: (tagName, attribs) => ({
          tagName: "iframe",
          attribs: {
            ...attribs,
            loading: attribs.loading ?? "lazy",
            referrerpolicy: attribs.referrerpolicy ?? "no-referrer",
          },
        }),
        a: (tagName, attribs) => ({
          tagName: "a",
          attribs: {
            ...attribs,
            rel: attribs.rel ?? "noopener noreferrer",
            target: attribs.target ?? "_blank",
          },
        }),
      },
    });

    return { meta, content: clean };
  } catch {
    return null;
  }
}

// Alias por compatibilidad con imports previos
export { getPostsMeta as getAllPosts };
