// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import groq from "groq";
import { PortableText } from "@portabletext/react";

import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";

type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  _createdAt: string;
  cover?: {
    alt?: string;
    asset?: { _ref: string; _id: string };
  };
  content?: any[];
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _createdAt,
  cover{
    alt,
    asset
  },
  content
}`;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: Post | null = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  const ogImage =
    post.cover?.asset
      ? urlFor(post.cover).width(1200).height(630).url()
      : "/og-default.jpg";

  return {
    title: post.title,
    description: "Lectura breve del blog de Daniel Reyna — Psicólogo.",
    openGraph: {
      title: post.title,
      images: [{ url: ogImage }],
      type: "article",
    },
  };
}

function formatDate(input?: string) {
  // Elegimos publishedAt si existe; si no, _createdAt.
  const d = input ? new Date(input) : undefined;
  // Utilidad: solo mostramos si es válida.
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post | null = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-semibold">Artículo no encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          El post solicitado no existe o fue eliminado.
        </p>
      </div>
    );
  }

  const dateToShow = formatDate(post.publishedAt ?? post._createdAt);
  const blocks = Array.isArray(post.content) ? post.content : [];

  return (
    <article className="max-w-3xl mx-auto py-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>
        {dateToShow && (
          <p className="mt-2 text-sm text-muted-foreground">{dateToShow}</p>
        )}
      </header>

      {post.cover?.asset && (
        <div className="my-8">
          <Image
            src={urlFor(post.cover).width(1600).height(900).fit("crop").url()}
            alt={post.cover?.alt || "Portada"}
            width={1600}
            height={900}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      )}

      <section className="prose prose-neutral max-w-none">
        {blocks.length > 0 ? (
          <PortableText value={blocks} />
        ) : (
          <p className="text-muted-foreground">
            Este artículo aún no tiene contenido publicado.
          </p>
        )}
      </section>
    </article>
  );
}
