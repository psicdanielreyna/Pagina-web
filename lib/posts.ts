// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;            // YYYY-MM-DD
  description?: string;
  image?: string | null;
};

const postsDir = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const filePath = path.join(postsDir, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      image: data.image ?? null,
    };
  } catch {
    return null;
  }
}

/** Lista para el índice del blog */
export function getPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .filter(Boolean) as PostMeta[]
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Alias por compatibilidad con imports previos */
export const getAllPosts = getPostsMeta;

/** Contenido completo de un post */
export async function getPostHtml(
  slug: string
): Promise<PostMeta & { html: string; content: string }> {
  const filePath = path.join(postsDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Aquí devolvemos `html` como el contenido tal cual.
  // Si ya tienes un pipeline que convierte Markdown -> HTML,
  // este campo lo consumirá sin cambios. Si no, la página
  // puede renderizar `content` con un renderer de markdown.
  const html = content;

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
    html,
    content,
  };
}