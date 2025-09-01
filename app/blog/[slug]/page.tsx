// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  // Para SSG en build/netlify
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Params) {
  const record = getPostBySlug(params.slug);
  if (!record) return notFound();

  // Compilar el MDX (el frontmatter ya lo leímos en lib/posts.ts)
  const { content } = await compileMDX({
    source: record.content,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <article className="container mx-auto px-4 py-10 prose prose-neutral max-w-3xl">
      <h1 className="mb-2">{record.meta.title}</h1>
      <p className="text-sm text-neutral-500">
        {new Date(record.meta.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-6">{content}</div>
    </article>
  );
}
