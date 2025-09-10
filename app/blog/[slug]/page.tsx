// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostBySlug, slugify } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  // preconstruye rutas con slugs SIN acentos
  const metas = getAllPostsMeta();
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const incoming = decodeURIComponent(params.slug);
  // por si llega con tildes, normaliza para buscar
  const normalized = slugify(incoming);
  const post = getPostBySlug(normalized);

  if (!post) return {};
  const { meta } = post;

  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      images: meta.cover ? [{ url: meta.cover }] : undefined,
      type: "article",
    },
  };
}

export default function PostPage({ params }: Props) {
  const incoming = decodeURIComponent(params.slug);
  const normalized = slugify(incoming);
  const post = getPostBySlug(normalized);

  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <main className="container mx-auto max-w-3xl px-4 md:px-6 py-10">
      <article className="prose prose-lg max-w-none">
        <h1 className="!mb-2 text-evergreen">{meta.title}</h1>
        {meta.date && (
          <p className="text-sm text-gray-500 !mt-0">
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
            className="rounded-xl shadow-sm my-6 w-full h-auto"
            loading="lazy"
          />
        )}

        {/* Render básico del Markdown: si usas MDX o un renderer, reemplázalo */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </main>
  );
}
