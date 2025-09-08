// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  return {
    title: data?.meta.title ?? "Blog",
    description: data?.meta.description,
    openGraph: { title: data?.meta.title, description: data?.meta.description },
  };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-MX", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);
  if (!data) return null;

  const { meta, content } = data;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight">{meta.title}</h1>

      {meta.date && (
        <p className="mt-2 text-sm text-gray-500">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        </p>
      )}

      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="mt-6 rounded-xl w-full max-w-2xl mx-auto object-cover"
        />
      )}

      <div
        className="prose prose-neutral mt-8"
        // contenido ya viene saneado a HTML
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <footer className="mt-10">
        <Link href="/blog" className="text-sm text-gray-600 hover:underline">
          ← Volver al blog
        </Link>
      </footer>
    </article>
  );
}