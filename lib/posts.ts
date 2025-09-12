// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

// 📂 Donde viven tus posts (Decap): content/blog
const postsDirectory = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;            // ISO o string plano
  cover?: string | null;    // ruta absoluta (/uploads/...) o URL
  excerpt?: string;         // texto plano corto
  tags?: string[];
};

/* ----------------------------- helpers ----------------------------- */

// slug seguro (quita acentos, símbolos raros y normaliza guiones)
export function slugify(input: string) {
  return input
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "-")
    ?.replace(/-+/g, "-");
}

// recorta texto plano (quita HTML y Markdown)
function toPlainExcerpt(input: string, maxLen = 160): string {
  if (!input) return "";
  const noHtml = input.replace(/<[^>]+>/g, "");
  const plain = removeMd(noHtml);
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}

// normaliza rutas de assets para next/image
function normalizeAsset(p?: unknown): string | null {
  if (!p) return null;
  const s = String(p).trim();
  if (!s) return null;
  if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/")) return s;
  // si viene "uploads/.." sin slash inicial → hazlo absoluto
  if (s.startsWith("uploads/")) return `/${s}`;
  return s;
}

// lista SOLO archivos .md/.mdx (ignora subdirectorios)
function listMarkdownFiles(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && (e.name.endsWith(".md") || e.name.endsWith(".mdx")))
    .map((e) => e.name);
}

// ordena por fecha descendente de forma segura
function sortByDateDesc(a?: string, b?: string) {
  const ta = a ? Date.parse(a) : NaN;
  const tb = b ? Date.parse(b) : NaN;
  const sa = isNaN(ta) ? 0 : ta;
  const sb = isNaN(tb) ? 0 : tb;
  return sb - sa; // más reciente primero
}

/* ------------------------------ core ------------------------------- */

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const mdFiles = listMarkdownFiles(postsDirectory);
  const posts: PostMeta[] = mdFiles.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // slug: frontmatter.slug > nombre de archivo
    const baseSlug = data?.slug
      ? slugify(String(data.slug))
      : slugify(fileName.replace(/\.mdx?$/, ""));

    return {
      slug: baseSlug,
      title: data?.title ?? baseSlug,
      date: data?.date ?? undefined,
      // Decap usa 'image'; mapeamos a cover. También aceptamos 'cover'.
      cover: normalizeAsset(data?.cover ?? data?.image) ?? null,
      tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
      // description (Decap) → excerpt; fallback al body
      excerpt: toPlainExcerpt(data?.excerpt ?? data?.description ?? content),
    };
  });

  // ordenar por fecha (desc)
  return posts.sort((p, q) => sortByDateDesc(p.date, q.date));
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  if (!fs.existsSync(postsDirectory)) {
    throw new Error(`Posts directory not found: ${postsDirectory}`);
  }

  const mdFiles = listMarkdownFiles(postsDirectory);

  // 1) Coincidencia por nombre de archivo (normalizado)
  for (const fileName of mdFiles) {
    const nameSlug = slugify(fileName.replace(/\.mdx?$/, ""));
    if (nameSlug === slug) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const meta: PostMeta = {
        slug: slugify(data?.slug ?? nameSlug),
        title: data?.title ?? slug,
        date: data?.date ?? undefined,
        cover: normalizeAsset(data?.cover ?? data?.image) ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt ?? data?.description ?? content),
      };

      return { meta, content };
    }
  }

  // 2) Coincidencia por frontmatter.slug normalizado
  for (const fileName of mdFiles) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const fmSlug = data?.slug ? slugify(String(data.slug)) : null;

    if (fmSlug && fmSlug === slug) {
      const meta: PostMeta = {
        slug: fmSlug,
        title: data?.title ?? fmSlug,
        date: data?.date ?? undefined,
        cover: normalizeAsset(data?.cover ?? data?.image) ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt ?? data?.description ?? content),
      };
      return { meta, content };
    }
  }

  throw new Error(`Post not found for slug: ${slug}`);
}
