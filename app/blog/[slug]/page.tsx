import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";
import { normalizeSlug } from "@/lib/slug";
import { MDXRemote } from "next-mdx-remote/rsc"; // o tu renderer actual

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map(p => ({ slug: p.slug })); // ya son ASCII-safe
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: { title: post.meta.title, description: post.meta.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(normalizeSlug(params.slug));
  if (!post) return notFound();

  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen">{post.meta.title}</h1>
      {post.meta.date && (
        <p className="mt-2 text-gray-600">
          {new Date(post.meta.date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      {post.meta.cover && (
        <img
          src={post.meta.cover}
          alt=""
          className="mt-6 rounded-2xl shadow-sm ring-1 ring-black/5"
          loading="lazy"
        />
      )}

      <article className="prose prose-lg mt-8">
        {/* Renderiza tu MDX/HTML aquí */}
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}
