// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "blog"),
  path.join(process.cwd(), "posts"),
];

const exts = [".md", ".mdx"];

type RawPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  cover?: string;
  draft?: boolean;
};

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

export function getAllPosts(): RawPost[] {
  const files = readAllMarkdownFiles();

  const posts: RawPost[] = files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);

    // mapeo tolerante de portada
    const cover =
      data.cover || data.image || data.thumbnail || data.featured_image || undefined;

    // slug desde filename
    const slug = path
      .basename(file)
      .replace(/\.mdx?$/i, "")
      .toLowerCase();

    // excerpt fallback
    const excerpt =
      data.excerpt ||
      (content || "").split("\n").find((l) => l.trim()).slice(0, 170) + "…";

    return {
      slug: data.slug || slug,
      title: data.title || slug,
      excerpt,
      date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "1970-01-01",
      cover,
      draft: Boolean(data.draft),
    };
  });

  // filtra borradores y ordena por fecha desc
  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
