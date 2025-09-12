// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

const postsDirectory = path.join(process.cwd(), "content");

// --- Tipado ---
export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;       // siempre string normalizada
  cover?: string | null;
  excerpt?: string;
  tags?: string[];
};

// --- Helpers ---
function slugify(input: string) {
  return input
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "") // quita acentos
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")    // quita símbolos raros
    ?.trim()
    ?.replace(/\s+/g, "-")            // espacios → guiones
    ?.replace(/-+/g, "-");
}

function toPlainExcerpt(input: string, maxLen = 160): string {
  if (!input) return "";
  const noHtml = input.replace(/<[^>]+>/g, "");
  const plain = removeMd(noHtml);
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}

// Normaliza cualquier fecha a string ISO o undefined
function normalizeDate(input: unknown): string | undefined {
  if (!input) return undefined;
  const d = input instanceof Date ? input : new Date(String(input));
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Lee solo .md/.mdx en un directorio
function listMarkdownFiles(dir: string) {
  const entries = fs.readdirSync(dir);
  return entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

// --- Core ---
export function getAllPostsMeta(): PostMeta[] {
  const mdFiles = listMarkdownFiles(postsDirectory);

  const posts: PostMeta[] = mdFiles.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const computedSlug =
      data?.slug ? slugify(String(data.slug)) : slugify(fileName.replace(/\.mdx?$/, ""));

    return {
      slug: computedSlug,
      title: data?.title ?? computedSlug,
      date: normalizeDate(data?.date),
      cover: data?.cover ?? null,
      tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
      excerpt: toPlainExcerpt(data?.excerpt || content),
    };
  });

  // ordena por fecha descendente
  return posts.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const mdFiles = listMarkdownFiles(postsDirectory);

  // buscar por nombre de archivo
  for (const fileName of mdFiles) {
    const nameSlug = slugify(fileName.replace(/\.mdx?$/, ""));
    if (nameSlug === slug) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const meta: PostMeta = {
        slug: slugify(data?.slug ?? nameSlug),
        title: data?.title ?? slug,
        date: normalizeDate(data?.date),
        cover: data?.cover ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt || content),
      };

      return { meta, content };
    }
  }

  // buscar por frontmatter.slug
  for (const fileName of mdFiles) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const fmSlug = data?.slug ? slugify(String(data.slug)) : null;
    if (fmSlug && fmSlug === slug) {
      const meta: PostMeta = {
        slug: fmSlug,
        title: data?.title ?? fmSlug,
        date: normalizeDate(data?.date),
        cover: data?.cover ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt || content),
      };
      return { meta, content };
    }
  }

  return null;
}
