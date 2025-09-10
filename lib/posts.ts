import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/** Directorios donde pueden estar los posts */
const POST_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "posts"),
];

/** Extensiones soportadas */
const EXTS = [".mdx", ".md"];

/** Tipos de datos */
export type PostMeta = {
  slug: string;
  title: string;
  date?: string; // ISO string
  excerpt?: string;
  cover?: string | null;
};

export type PostData = {
  meta: PostMeta;
  contentHtml: string;
};

/**
 * Obtener lista de todos los posts (ordenados por fecha desc).
 */
export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const metas: PostMeta[] = [];

  for (const dir of POST_DIRS) {
    try {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const ext = path.extname(file);
        if (!EXTS.includes(ext)) continue;

        const slug = path.basename(file, ext);
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);

        metas.push({
          slug,
          title: data.title ?? slug,
          date: data.date ? new Date(data.date).toISOString() : undefined,
          excerpt: data.excerpt ?? data.description ?? undefined,
          cover: data.cover ?? data.image ?? null,
        });
      }
    } catch {
      // si no existe el directorio, seguimos
    }
  }

  // ordenar por fecha descendente
  return metas.sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  );
}

/**
 * Obtener un post completo en HTML + meta.
 */
export async function getPostHtml(slug: string): Promise<PostData | null> {
  for (const dir of POST_DIRS) {
    for (const ext of EXTS) {
      const filePath = path.join(dir, `${slug}${ext}`);
      try {
        await fs.access(filePath);

        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);

        const processed = await remark().use(html).process(content);
        const contentHtml = String(processed);

        const meta: PostMeta = {
          slug,
          title: data.title ?? slug,
          date: data.date ? new Date(data.date).toISOString() : undefined,
          excerpt: data.excerpt ?? data.description ?? undefined,
          cover: data.cover ?? data.image ?? null,
        };

        return { meta, contentHtml };
      } catch {
        // probamos siguiente combinación dir/ext
      }
    }
  }
  return null;
}
