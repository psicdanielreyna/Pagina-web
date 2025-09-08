// app/blog/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

// Rutas estáticas
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// SEO dinámico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostHtml(params.slug);
  if (!post) return { title: "Entrada no encontrada" };

  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [{ url: meta.image }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostHtml(params.slug);
  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight mb-3">
        {meta.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">{meta.date}</p>

      {meta.image && (
        <div className="mb-8">
          <Image
            src={meta.image}
            alt={meta.title}
            width={1200}
            height={630}
            className="rounded-xl w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* contenido ya viene saneado en HTML */}
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <footer className="mt-10">
        <Link href="/blog" className="text-sm underline">
          ← Volver al blog
        </Link>
      </footer>
    </article>
  );
}