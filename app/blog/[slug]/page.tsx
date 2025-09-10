// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);

  return {
    title: meta.title,
    description: meta.excerpt, // <— antes decía meta.description
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      images: meta.cover ? [meta.cover] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, html } = await getPostHtml(params.slug);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-evergreen tracking-tight">
        {meta.title}
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        {new Date(meta.date).toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      {meta.excerpt && (
        <p className="mt-4 text-lg text-gray-800">{meta.excerpt}</p>
      )}

      {meta.cover && (
        <div className="mt-6 overflow-hidden rounded-2xl border">
          {/* Puedes cambiar a next/image si prefieres */}
          <Image
            src={meta.cover}
            alt=""
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      <article
        className="prose prose-lg prose-headings:font-semibold prose-a:underline mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
