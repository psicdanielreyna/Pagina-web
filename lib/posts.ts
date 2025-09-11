import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown"; // 👈 limpia Markdown a texto plano

const postsDirectory = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  title?: string;
  date?: string;
  cover?: string;
  excerpt?: string;
  tags?: string[];
};

// 🔹 Helper para limpiar HTML/Markdown
function toPlainExcerpt(input: string, maxLen = 160): string {
  if (!input) return "";
  // quitar HTML
  const noHtml = input.replace(/<[^>]+>/g, "");
  // quitar Markdown
  const plain = removeMd(noHtml);
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain;
}


export function getAllPostsMeta(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

// 🔹 filtra solo archivos con extensión .md o .mdx
const mdFiles = fileNames.filter(
  (file) => file.endsWith(".md") || file.endsWith(".mdx")
);

const allPosts = mdFiles.map((fileName) => {
  const slug = fileName.replace(/\.mdx?$/, "").replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? null,
    cover: data.cover ?? null,
    tags: data.tags ?? [],
    excerpt: toPlainExcerpt(data.excerpt || content),
  } as PostMeta;
});

  return allPosts.sort((a, b) =>
    (a.date ?? "").localeCompare(b.date ?? "", "es", { numeric: true })
  );
}