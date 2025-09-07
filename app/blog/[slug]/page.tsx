// app/blog/[slug]/page.tsx
import Link from "next/link";
import { getAllSlugs, getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug: encodeURIComponent(slug) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(decodeURIComponent(params.slug));
  return { title: meta.title, description: meta.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, content } = await getPostHtml(decodeURIComponent(params.slug));
  // … tu render actual
  return (
    <article className="prose mx-auto">
      <h1>{meta.title}</h1>
      {/* … */}
      <footer className="mt-10">
        <Link href="/blog">← Volver al blog</Link>
      </footer>
    </article>
  );
}