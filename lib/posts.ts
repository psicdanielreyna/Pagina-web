// lib/posts.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Carpeta donde están tus MD/MDX
const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;             // p.ej. "amor-propio-vs-egoismo-donde-esta-la-linea"
  title: string;
  excerpt?: string;
  date?: string;            // ISO "YYYY-MM-DD"
  cover?: string | null;
  draft?: boolean;
};

export type PostData = {
  meta: PostMeta;
  content: string;          // Markdown “crudo” (si luego quieres parsear a HTML, hazlo en la página)
};

/** Normaliza un string a slug web-safe (quita tildes, ñ, símbolos, espacios, etc.) */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")     // acentos
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")         // cualquier cosa -> guión
    .replace(/^-+|-+$/g, "");            // bordes
}

/** Convierte cualquier valor de fecha a ISO YYYY-MM-DD o undefined si no es válida */
function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const d = new Date(value as any);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

/** Lee un archivo y devuelve { meta, content } */
function readPostFile(filePath: string): PostData {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  // slug base: nombre de archivo sin extensión o, si existe, el de front-matter
  const baseName = path.basename(filePath, path.extname(filePath));
  const fmSlug = (parsed.data?.slug as string | undefined)?.toString().trim();
  const rawTitle = (parsed.data?.title as string | undefined) ?? baseName;
  const title = rawTitle.toString().trim();

  // preferimos el slug del front-matter si viene; si no, generamos a partir del título
  const slug = slugify(fmSlug || title);

  const meta: PostMeta = {
    slug,
    title,
    excerpt: (parsed.data?.excerpt as string | undefined) ?? (parsed.data?.description as string | undefined),
    date: toIsoDate(parsed.data?.date),
    cover: (parsed.data?.cover as string | undefined) ?? (parsed.data?.image as string | undefined) ?? null,
    draft: Boolean(parsed.data?.draft),
  };

  return { meta, content: parsed.content };
}

/** Devuelve todos los metadatos (sin contenido) ordenados por fecha desc (si hay) */
export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.(md|mdx)$/i.test(f))
    .map((f) => path.join(POSTS_DIR, f));

  return files
    .map((fullPath) => {
      const { meta } = readPostFile(fullPath);
      return meta;
    })
    .filter((m) => !m.draft) // oculta borradores
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta; // reciente primero
    });
}

/** Devuelve un post por slug (busca por nombre de archivo y por slug del front-matter/título) */
export function getPostBySlug(slug: string): PostData | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const target = slugify(slug);

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.(md|mdx)$/i.test(f));

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const { meta, content } = readPostFile(fullPath);

    // coincide si:
    // 1) el nombre “limpio” del archivo coincide, o
    // 2) el slug generado desde title coincide, o
    // 3) el slug del front-matter coincide (ya viene en meta.slug)
    const baseName = path.basename(file, path.extname(file));
    const fileSlug = slugify(baseName);

    if (meta.slug === target || fileSlug === target) {
      return { meta, content };
    }
  }

  return null;
}

/** Slugs para generateStaticParams() */
export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((m) => m.slug);
}
