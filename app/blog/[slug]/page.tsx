import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Markdown from "@/components/Markdown";

// ---- SSG params ----
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

// ---- SEO ----
export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artículo" };
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.excerpt ?? undefined,
    openGraph: {
      title: meta.title,
      description: meta.excerpt ?? undefined,
      images: meta.cover ? [meta.cover] : undefined,
      type: "article",
    },
  };
}

// ---- Página ----
export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const { meta, content } = post;

  return (
    <article className="container mx-auto max-w-3xl px-4 md:px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-evergreen leading-tight">
          {meta.title}
        </h1>
        {meta.date && (
          <p className="mt-2 text-sm text-gray-600">
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      {meta.cover && (
        <img
          src={meta.cover}
          alt=""
          className="w-full rounded-2xl shadow-sm mb-8"
          loading="lazy"
        />
      )}

      {/* Aquí renderizamos el markdown como Client Component */}
      <Markdown content={content} />
    </article>
  );
}
