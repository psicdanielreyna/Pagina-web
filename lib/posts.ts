// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Para render de Markdown a HTML
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;    // ISO yyyy-mm-dd
  cover?: string;
  draft?: boolean;
};

const BLOG_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "blog"),
  path.join(process.cwd(), "posts"),
];

const exts = [".md", ".mdx"];

function readAllMarkdownFiles(): string[] {
  const files: string[] = [];
  for (const dir of BLOG_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const walk = (d: string) => {
      for (const entry of fs.readdirSync(d)) {
        const full = path.join(d, entry);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) walk(full);
        else if (exts.includes(path.extname(full))) files.push(full);
      }
    };
    walk(dir);
  }
  return files;
}

function normalizeMeta(filePath: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const slug =
    (data.slug as string) ??
    path.basename(filePath).replace(/\.mdx?$/i, "").toLowerCase();

  const cover =
    (data.cover as string) ??
    (data.image as string) ??
    (data.thumbnail as string) ??
    (data.featured_image as string) ??
    undefined;

  const firstLine = (content || "")
    .split("\n")
    .map((l) => l.trim())
    .find(Boolean);

  const excerpt =
    (data.excerpt as string) ??
    (firstLine ? (firstLine.length > 170 ? firstLine.slice(0, 170) + "…" : firstLine) : "");

  const isoDate = data.date
    ? new Date(data.date as string).toISOString().slice(0, 10)
    : "1970-01-01";

  const meta: PostMeta = {
    slug,
    title: (data.title as string) ?? slug,
    excerpt,
    date: isoDate,
    cover,
    draft: Boolean(data.draft),
  };

  return { meta, content };
}

/** Lista de posts (sin borradores), ordenados por fecha DESC */
export function getAllPosts(): PostMeta[] {
  const files = readAllMarkdownFiles();
  return files
    .map((f) => normalizeMeta(f).meta)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Compatibilidad con componentes existentes */
export function getPostsMeta(): PostMeta[] {
  return getAllPosts();
}

/** Devuelve meta + contenido crudo de un slug */
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  for (const dir of BLOG_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const ext of exts) {
      const candidate = path.join(dir, `${slug}${ext}`);
      if (fs.existsSync(candidate)) {
        return normalizeMeta(candidate);
      }
    }
  }
  return null;
}

/** Renderiza el markdown a HTML para un slug concreto */
export async function getPostHtml(slug: string): Promise<{
  meta: PostMeta;
  html: string;
}> {
  const found = getPostBySlug(slug);
  if (!found) throw new Error(`Post not found: ${slug}`);

  const processed = await remark().use(html).process(found.content);
  const htmlString = processed.toString();

  return { meta: found.meta, html: htmlString };
}
