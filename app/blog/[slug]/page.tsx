// app/blog/[slug]/page.tsx
import { getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { html, meta } = await getPostHtml(params.slug);

  return (
    <main className="container mx-auto px-4">
      {/* Título */}
      <h1 className="mt-8 text-4xl font-bold tracking-tight">{meta.title}</h1>

      {/* Descripción opcional */}
      {meta.description ? (
        <p className="mt-3 text-neutral-600">{meta.description}</p>
      ) : null}

      {/* Contenido del post con estilos personalizados */}
      <article
        className="post-content mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}