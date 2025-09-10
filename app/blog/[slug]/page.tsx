// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";

type Props = { params: { slug: string } };

// Pre-render de rutas estáticas del blog
export function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

// SEO dinámico por post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug);
  const data = await getPostBySlug(slug);
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
    twitter: {
      card: meta.cover ? "summary_large_image" : "summary",
      title: meta.title,
      description: meta.excerpt ?? undefined,
      images: meta.cover ? [meta.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug); // <- importante para acentos/espacios
  const data = await getPostBySlug(slug);
  if (!data) return notFound();

  const { meta, content } = data;

  const formattedDate =
    meta.date &&
    new Date(meta.date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <article className="container mx-auto max-w-3xl px-4 md:px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-evergreen">
          {meta.title}
        </h1>
        {formattedDate && (
          <p className="mt-2 text-sm text-gray-600">{formattedDate}</p>
        )}
      </header>

      {meta.cover && (
        <div className="mb-8">
          {/* Puedes migrar a next/image si quieres */}
          <img
            src={meta.cover}
            alt={meta.title}
            className="w-full rounded-2xl shadow-sm"
            loading="lazy"
          />
        </div>
      )}

      <div
        className="prose prose-lg prose-emerald max-w-none
                   prose-headings:text-evergreen prose-a:text-emerald-700
                   prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
