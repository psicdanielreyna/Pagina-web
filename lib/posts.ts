import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sanitizeHtml from "sanitize-html";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;            // ISO string
  description?: string;    // opcional (por si no lo pones en el frontmatter)
  excerpt?: string;        // opcional (para listados)
  image?: string | null;   // sigue aceptando image
  cover?: string | null;   // alias alterno
  draft?: boolean;         // 👈 ahora existe en el tipo
}

export interface PostData {
  meta: PostMeta;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const isoDate =
      typeof data.date === "string"
        ? data.date
        : data.date instanceof Date
        ? data.date.toISOString()
        : "";

    const description: string | undefined =
      (typeof data.description === "string" && data.description) || undefined;

    const cover =
      (typeof data.cover === "string" && data.cover) ||
      (typeof data.image === "string" && data.image) ||
      null;

    // Si no hay description, genera un pequeño excerpt del contenido
    const contentText =
      typeof content === "string"
        ? content.replace(/[#>*_`~\-!$begin:math:display$$end:math:display$$begin:math:text$$end:math:text$]/g, "").trim()
        : "";
    const excerpt =
      description ||
      (contentText ? contentText.slice(0, 180).trim() + (contentText.length > 180 ? "…" : "") : undefined);

    return {
      slug,
      title: data.title ?? "",
      date: isoDate,
      description,
      excerpt,
      image: cover, // mantenemos ambos por compatibilidad
      cover,
      draft: Boolean(data.draft),
    };
  } catch {
    return null;
  }
}

export function getPostsMeta(): PostMeta[] {
  const list = getAllSlugs()
    .map((s) => getPostMeta(s))
    .filter((m): m is PostMeta => m !== null);

  // Oculta borradores en producción
  const visible =
    process.env.NODE_ENV === "production"
      ? list.filter((m) => !m.draft)
      : list;

  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostHtml(slug: string): Promise<PostData | null> {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const isoDate =
      typeof data.date === "string"
        ? data.date
        : data.date instanceof Date
        ? data.date.toISOString()
        : "";

    const description: string | undefined =
      (typeof data.description === "string" && data.description) || undefined;

    const cover =
      (typeof data.cover === "string" && data.cover) ||
      (typeof data.image === "string" && data.image) ||
      null;

    const clean = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "video", "source"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
        iframe: ["src", "width", "height", "allow", "allowfullscreen", "title"],
        video: ["src", "width", "height", "controls", "poster"],
        source: ["src", "type"],
      },
      // permite embeds básicos (YouTube, etc.)
      allowedSchemesByTag: {
        iframe: ["https", "http"],
      },
    });

    const meta: PostMeta = {
      slug,
      title: data.title ?? "",
      date: isoDate,
      description,
      // también generamos excerpt aquí por si lo necesitas en el detalle
      excerpt:
        description ||
        (typeof content === "string"
          ? content.replace(/[#>*_`~\-!\[\]\(\)]/g, "").trim().slice(0, 180) +
            (content.length > 180 ? "…" : "")
          : undefined),
      image: cover,
      cover,
      draft: Boolean(data.draft),
    };

    return { meta, content: clean };
  } catch {
    return null;
  }
}

// Alias por compatibilidad
export { getPostsMeta as getAllPosts };
