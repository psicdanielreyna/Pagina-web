import { getAllSlugs, getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [{ url: meta.image }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, html } = await getPostHtml(params.slug);

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <article>
        <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
        <p className="text-sm text-neutral-500 mb-8">
          {meta.date ? new Date(meta.date).toLocaleDateString("es-MX") : null}
        </p>
        {/* eslint-disable-next-line react/no-danger */}
        <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}