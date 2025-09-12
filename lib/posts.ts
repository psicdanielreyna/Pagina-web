// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";

export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;            // ISO YYYY-MM-DD
  cover?: string | null;
  excerpt?: string;
  tags?: string[];
};

// --- helpers ---
function slugify(input: string) {
  return input
    ?.normalize("NFD")
    ?.replace(/[\u0300-\u036f]/g, "")
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.trim()
    ?.replace(/\s+/g, "-")
    ?.replace(/-+/g, "-");
}

function toPlainExcerpt(input: string, maxLen = 160): string {
  if (!input) return "";
  const noHtml = input.replace(/<[^>]+>/g, "");
  const plain = removeMd(noHtml);
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}

function normalizeDate(input: unknown): string | undefined {
  if (!input) return undefined;
  const d = input instanceof Date ? input : new Date(String(input));
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

// --- filesystem ---
const CANDIDATE_DIRS = [
  "content",
  "content/blog",
  "posts",
  "app/blog/content",
].map((p) => path.join(process.cwd(), p));

function listMarkdownFilesRecursive(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  const stack: string[] = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else if (entry.isFile() && (abs.endsWith(".md") || abs.endsWith(".mdx"))) {
        out.push(abs);
      }
    }
  }
  return out;
}

function findAllMarkdownFiles(): string[] {
  return CANDIDATE_DIRS.flatMap((d) => listMarkdownFilesRecursive(d));
}

// --- core ---
export function getAllPostsMeta(): PostMeta[] {
  const files = findAllMarkdownFiles();

  const posts: PostMeta[] = files.map((absPath) => {
    const fileContents = fs.readFileSync(absPath, "utf8");
    const { data, content } = matter(fileContents);
    const base = path.basename(absPath).replace(/\.mdx?$/, "");
    const computedSlug = data?.slug ? slugify(String(data.slug)) : slugify(base);

    return {
      slug: computedSlug,
      title: data?.title ?? computedSlug,
      date: normalizeDate(data?.date),
      cover: data?.cover ?? null,
      tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
      excerpt: toPlainExcerpt(data?.excerpt || content),
    };
  });

  // ordenar por fecha (recientes primero)
  return posts.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}

export function getPostBySlug(
  slug: string
): { meta: PostMeta; content: string } | null {
  const files = findAllMarkdownFiles();

  // 1) por nombre de archivo
  for (const absPath of files) {
    const baseSlug = slugify(path.basename(absPath).replace(/\.mdx?$/, ""));
    if (baseSlug === slug) {
      const fileContents = fs.readFileSync(absPath, "utf8");
      const { data, content } = matter(fileContents);
      const meta: PostMeta = {
        slug: slugify(data?.slug ?? baseSlug),
        title: data?.title ?? slug,
        date: normalizeDate(data?.date),
        cover: data?.cover ?? null,
        tags: Array.isArray(data?.tags) ? (data.tags as string[]) : [],
        excerpt: toPlainExcerpt(data?.excerpt || content),
      };
      return { meta, content };
    }
  }

  // 2) por frontmatter.slug
  for (const absPath of files) {
    const fileContents = fs.readFileSync(absPath, "utf8");
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
