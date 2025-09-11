// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

const postsDirectory = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;           // string | undefined
  cover?: string | null;
  excerpt?: string;        // siempre texto plano
  tags?: string[];
};

// --- helpers ---
export function slugify(input: string) {
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
  // quita HTML y Markdown
  const noHtml = input.replace(/<[^>]+>/g, "");
  const plain = removeMd(noHtml);
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}

// Lee solo .md/.mdx (ignora directorios)
function listMarkdownFiles(dir: string) {
  const entries = fs.readdirSync(dir);
  return entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

// --- core ---
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
      date: data?.date ?? undefined,
      cover: data?.cover ?? null,
      tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
      excerpt: toPlainExcerpt(data?.excerpt || content),
    };
  });

  // ordena por fecha descendente (si existe)
  return posts.sort((a, b) => {
    const ad = a.date ?? "";
    const bd = b.date ?? "";
    return bd.localeCompare(ad, "es", { numeric: true });
  });
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const mdFiles = listMarkdownFiles(postsDirectory);
  // buscar archivo cuyo slug normalizado coincida
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
        cover: data?.cover ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt || content),
      };

      return { meta, content };
    }
  }

  // Si no se encontró por nombre de archivo, intenta por frontmatter.slug
  const all = listMarkdownFiles(postsDirectory);
  for (const fileName of all) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const fmSlug = data?.slug ? slugify(String(data.slug)) : null;
    if (fmSlug && fmSlug === slug) {
      const meta: PostMeta = {
        slug: fmSlug,
        title: data?.title ?? fmSlug,
        date: data?.date ?? undefined,
        cover: data?.cover ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt || content),
      };
      return { meta, content };
    }
  }

  throw new Error(`Post not found for slug: ${slug}`);
}