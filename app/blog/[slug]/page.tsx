// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import groq from "groq";
import { PortableText, PortableTextComponents } from "@portabletext/react";

import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";

// --- ISR: revalidar cada 10 minutos ---
export const revalidate = 600;

// ---- Queries ----
const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  cover{
    ...,
    asset->{
      url,
      metadata { dimensions }
    }
  },
  // Contenido Portable Text (bloques + imágenes)
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
}`;

const allSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;

// ---- Tipos mínimos ----
type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  cover?: any;
  content?: any[];
};

// ---- Helpers ----
function formatDate(date?: string) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return date;
  }
}

// ---- Metadata (SEO) ----
const postMetaQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "description": coalesce(excerpt, pt::text(content)[0...160]),
  cover{..., asset-> { url }},
  "coverAlt": cover.alt,
}`;

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await client.fetch(postMetaQuery, { slug: params.slug });

  const title = post?.title ?? "Artículo";
  const description =
    (post?.description && String(post.description)) ||
    "Lectura breve y aplicable para sentirte mejor.";

  const site = "https://danielreyna.netlify.app";
  const url = `${site}/blog/${params.slug}`;

  const coverUrl =
    (post?.cover &&
      urlFor(post.cover).width(1600).height(900).fit("crop").url()) ||
    `${site}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Daniel Reyna — Psicólogo",
      title,
      description,
      images: [
        {
          url: coverUrl,
          width: 1600,
          height: 900,
          alt: post?.coverAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverUrl],
    },
  };
}

// ---- SSG de rutas dinámicas ----
export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(allSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

// ---- Render de Portable Text ----
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="leading-7 md:leading-8 my-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as any)?.href || "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as any;
      const src =
        img?.asset?.url ||
        (img && urlFor(img).width(1200).height(800).fit("crop").url());
      if (!src) return null;
      const alt = img?.alt || "";
      return (
        <div className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="rounded-xl w-full h-auto" />
        </div>
      );
    },
  },
};

// ---- Página ----
export default async function BlogPostPage({ params }: Params) {
  const post = (await client.fetch(postQuery, { slug: params.slug })) as Post | null;

  if (!post) {
    notFound();
  }

  const hasCover = !!post.cover;
  const coverUrl =
    hasCover &&
    urlFor(post.cover).width(1600).height(900).fit("crop").url();

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {post.title}
        </h1>
        {post.publishedAt && (
          <p className="text-sm text-muted-foreground mt-2">
            Publicado el {formatDate(post.publishedAt)}
          </p>
        )}
      </header>

      {hasCover && coverUrl && (
        <div className="my-8">
          <Image
            src={coverUrl}
            alt={post.cover?.alt || "Portada"}
            width={1600}
            height={900}
            className="rounded-xl w-full h-auto"
            priority
          />
        </div>
      )}

      <section className="prose prose-zinc max-w-none dark:prose-invert">
        {post.content?.length ? (
          <PortableText value={post.content} components={components} />
        ) : (
          <p>Próximamente…</p>
        )}
      </section>
    </article>
  );
}
