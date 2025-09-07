// app/blog/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  // usamos los metas para obtener los slugs
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostHtml(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostHtml(params.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        {post.date && (
          <p className="mt-1 text-sm text-gray-500">{post.date}</p>
        )}
        {post.description && (
          <p className="mt-2 text-gray-600">{post.description}</p>
        )}
      </header>

      {post.image && (
        <div className="my-6">
          {/* Si tus imágenes vienen de /uploads, usa <img> para evitar domain config de next/image */}
          <img
            src={post.image}
            alt={post.title}
            className="mx-auto rounded-lg"
            style={{ maxWidth: "800px", width: "100%", height: "auto" }}
          />
        </div>
      )}

      {/* Contenido:
         - Si `post.html` ya es HTML, se mostrará tal cual.
         - Si `post.html` es Markdown, puedes cambiar esto por un renderer (react-markdown) más adelante.
      */}
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="mt-10">
        <Link href="/blog" className="text-green-700 hover:underline">
          ← Volver al blog
        </Link>
      </footer>
    </article>
  );
}