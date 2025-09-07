// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, content } = await getPostHtml(params.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">{meta.title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {new Date(meta.date).toUTCString()}
        </p>
      </header>

      {meta.image && (
        <div className="relative mx-auto my-6 aspect-[16/9] max-w-3xl overflow-hidden rounded-xl">
          <Image
            src={meta.image}
            alt={meta.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {/* ahora content es Markdown en crudo; si quieres HTML, podemos integrar un renderer */}
      <div className="prose prose-neutral max-w-none whitespace-pre-wrap">
        {content}
      </div>

      <footer className="mt-8">
        <Link href="/blog" className="text-green-700 hover:underline">
          ← Volver al blog
        </Link>
      </footer>
    </article>
  );
}