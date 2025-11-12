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
  date?: string;
  cover?: string | null;
  excerpt?: string;
  tags?: string[];
  // SEO opcional
  seoTitle?: string;
  seoDescription?: string;
  noindex?: boolean;
  nofollow?: boolean;
  // NUEVO
  draft?: boolean;
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

// ¿está publicado? (no draft y fecha no futura)
function isPublished(meta: PostMeta) {
  if (meta?.draft) return false;
  if (!meta?.date) return true;
  return new Date(meta.date) <= new Date();
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
      // NUEVO: estado de borrador
      draft: Boolean(data?.draft),
      // Si quieres mapear SEO opcional, lee y pasa en el meta:
      seoTitle: data?.seoTitle ?? undefined,
      seoDescription: data?.seoDescription ?? undefined,
      noindex: typeof data?.noindex === "boolean" ? data.noindex : undefined,
      nofollow: typeof data?.nofollow === "boolean" ? data.nofollow : undefined,
    };
  });

  // ordenar por fecha (desc)
  return posts.sort((p, q) => sortByDateDesc(p.date, q.date));
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export function getPublishedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => isPublished(p));
}

export function getPublishedSlugs(): string[] {
  return getPublishedPosts().map((p) => p.slug);
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
        draft: Boolean(data?.draft),
        seoTitle: data?.seoTitle ?? undefined,
        seoDescription: data?.seoDescription ?? undefined,
        noindex: typeof data?.noindex === "boolean" ? data.noindex : undefined,
        nofollow: typeof data?.nofollow === "boolean" ? data.nofollow : undefined,
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
        draft: Boolean(data?.draft),
        seoTitle: data?.seoTitle ?? undefined,
        seoDescription: data?.seoDescription ?? undefined,
        noindex: typeof data?.noindex === "boolean" ? data.noindex : undefined,
        nofollow: typeof data?.nofollow === "boolean" ? data.nofollow : undefined,
      };
      return { meta, content };
    }
  }

  throw new Error(`Post not found for slug: ${slug}`);
}