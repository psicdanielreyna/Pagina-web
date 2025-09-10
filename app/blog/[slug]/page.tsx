import { notFound } from "next/navigation";
import type { Metadata } from "next";
// Usa los nombres que sí exporta tu lib:
import { getAllPostsMeta, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  if (!data) return { title: "Artículo no encontrado" };
  const { meta } = data;
  return {
    title: meta.title,
    description: meta.excerpt ?? undefined,
    openGraph: {
      title: meta.title,
      description: meta.excerpt ?? undefined,
      images: meta.cover ? [{ url: meta.cover }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);
  if (!data) return notFound();

  const { meta, html } = data;

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen">
          {meta.title}
        </h1>
        {meta.date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        {meta.cover && (
          <img
            src={meta.cover}
            alt=""
            className="mt-6 w-full rounded-xl shadow-sm"
            loading="lazy"
          />
        )}
      </header>

      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
