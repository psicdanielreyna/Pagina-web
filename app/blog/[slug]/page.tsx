// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

type Params = { params: { slug: string } };

async function mdToHtml(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Params) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    return notFound();
  }

  const html = await mdToHtml(post.content);

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
        ← Volver al blog
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{post.meta.title}</h1>
      {post.meta.date && (
        <p className="mt-1 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
            new Date(post.meta.date)
          )}
        </p>
      )}

      <article
        className="prose prose-neutral dark:prose-invert mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
