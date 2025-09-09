import type { Metadata } from "next";
import Image from "next/image";
import { getAllSlugs, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  if (!data) return { title: "Artículo no encontrado" };

  const { meta } = data;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [{ url: meta.image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);

  if (!data) {
    return (
      <main className="container py-12">
        <h1 className="text-2xl font-semibold">Artículo no encontrado</h1>
        <p className="mt-2 text-sm opacity-70">Revisa la URL o vuelve al blog.</p>
      </main>
    );
  }

  const { meta, content } = data;

  return (
    <main className="container max-w-4xl py-10">
      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">{meta.title}</h1>
          {meta.date && (
            <p className="text-sm opacity-70">
              {new Date(meta.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          {meta.description && <p className="text-base opacity-80">{meta.description}</p>}
        </header>

        {/* Hero optimizado para LCP */}
        {meta.image && (
          <div className="my-4">
            <Image
              src={meta.image}
              alt={meta.title}
              width={1200}
              height={800}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}

        {/* Contenido del post */}
        <div
          className="post-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}
