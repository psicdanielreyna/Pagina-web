// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string | null;
};

export type PostData = {
  meta: PostMeta;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "content/blog");

// 🔹 Normaliza portadas (cover o image) y corrige rutas
function resolveCover(data: any): string | null {
  const raw = data?.cover ?? data?.image ?? null;
  if (!raw) return null;

  let url = String(raw).trim().replace(/^['"]|['"]$/g, "");

  if (url.startsWith("./")) url = url.slice(1);

  if (url.startsWith("content/")) {
    url = url.replace(/^content\/blog\//, "/images/");
  }

  if (!/^https?:\/\//.test(url) && !url.startsWith("/")) {
    url = "/" + url;
  }

  return url;
}

// 🔹 Devuelve metadata de todos los posts
export function getAllPostsMeta(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const metas = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const cover = resolveCover(data);

      return {
        slug,
        title: String(data.title ?? slug),
        date: data.date ? String(data.date) : undefined,
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        cover,
      };
    });

  // Ordena por fecha descendente
  return metas.sort((a, b) =>
    a.date && b.date ? (a.date < b.date ? 1 : -1) : 0
  );
}

// 🔹 Devuelve un post individual (contenido + meta)
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(fileContents);

  const processedContent = await remark().use(html).process(parsed.content);
  const content = processedContent.toString();

  const meta: PostMeta = {
    slug,
    title: String(parsed.data.title ?? slug),
    date: parsed.data.date ? String(parsed.data.date) : undefined,
    excerpt: parsed.data.excerpt ? String(parsed.data.excerpt) : undefined,
    cover: resolveCover(parsed.data),
  };

  return { meta, content };
}
