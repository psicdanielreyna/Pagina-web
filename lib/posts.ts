// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog"); // ajusta si usas otra carpeta

// 🔧 Normalizador de slugs: sin acentos, minúsculas, guiones, sin símbolos raros
export function slugify(input: string): string {
  return input
    .normalize("NFD")                    // separa tildes
    .replace(/[\u0300-\u036f]/g, "")     // quita tildes
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")        // quita símbolos
    .trim()
    .replace(/\s+/g, "-")                // espacios -> guiones
    .replace(/-+/g, "-");
}

export type PostMeta = {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  cover?: string | null;
  draft?: boolean;
};

export type PostData = {
  meta: PostMeta;
  content: string;
};

export function getAllPostsMeta(): PostMeta[] {
  // ...dentro del map de getAllPostsMeta()
  const rawDate = data.date; // puede ser string, Date, etc.
  let date: string | undefined = undefined;
  if (rawDate) {
    const d = new Date(rawDate as any);
    if (!Number.isNaN(d.getTime())) {
      // usa solo la parte YYYY-MM-DD para consistencia
      date = d.toISOString().slice(0, 10);
    }
  }
  
  const meta: PostMeta = {
    slug: computedSlug,
    title,
    excerpt: data.excerpt ?? data.description ?? undefined,
    date, // <-- ya es string o undefined
    cover: data.cover ?? data.image ?? null,
    draft: Boolean(data.draft),
  };

    return meta;
  })
  // opcional: filtra borradores
  .filter(m => !m.draft)
  // ordena por fecha desc si hay fecha
 // ordena por fecha (más reciente primero), tolerante a undefined
  .sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });

export function getPostBySlug(slug: string): PostData | null {
  // intentamos localizar por frontmatter.slug o por título normalizado
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));

  for (const filename of files) {
    const full = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(full, "utf-8");
    const { data, content } = matter(raw);

    const title: string = data.title ?? path.basename(filename, path.extname(filename));
    const fmSlug: string | undefined = data.slug;
    const normTitleSlug = slugify(title);
    const normFmSlug = fmSlug ? slugify(fmSlug) : undefined;

    if (slug === normTitleSlug || (normFmSlug && slug === normFmSlug)) {
      const meta: PostMeta = {
        slug: normFmSlug ?? normTitleSlug,
        title,
        excerpt: data.excerpt ?? data.description ?? undefined,
        date: data.date ?? undefined,
        cover: data.cover ?? data.image ?? null,
        draft: Boolean(data.draft),
      };
      return { meta, content };
    }
  }

  return null;
}
