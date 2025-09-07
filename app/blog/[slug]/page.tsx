// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

// SEO dinámico por post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  if (!data) return { title: "Entrada no encontrada" };

  const { meta } = data;
  return {
    title: meta.title,
    description:
      meta.description ??
      "Artículo del blog de Daniel Reyna — Psicólogo.",
    openGraph: {
      title: meta.title,
      description:
        meta.description ??
        "Artículo del blog de Daniel Reyna — Psicólogo.",
      images: meta.image ? [{ url: meta.image }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);
  if (!data) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold">Entrada no encontrada</h1>
        <p className="mt-2 text-neutral-600">
          La publicación que intentas ver no existe.
        </p>
      </main>
    );
  }

  const { meta, html } = data;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-neutral md:prose-lg max-w-none">
        <h1 className="!mb-2">{meta.title}</h1>
        {meta.date && (
          <p className="!mt-0 text-sm text-neutral-500">
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {meta.image && (
          <img
            src={meta.image}
            alt={meta.title}
            className="mx-auto my-6 rounded-xl max-w-2xl w-full h-auto"
            loading="lazy"
          />
        )}

        {/* Contenido en HTML generado a partir del markdown */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}