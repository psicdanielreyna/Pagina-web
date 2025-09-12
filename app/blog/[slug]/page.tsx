// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Markdown from "@/components/Markdown";

// ---- SSG params ----
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

// ---- SEO ----
export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artículo" };
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.excerpt ?? undefined,
    openGraph: {
      title: meta.title ?? "",
      description: meta.excerpt ?? "",
      images: meta.cover ? [meta.cover] : [],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();
  const { meta, content } = post;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {meta.date
            ? new Date(meta.date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : null}
        </p>

        {meta.cover && (
          <div className="relative mt-6 w-full aspect-[16/9] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {/* si aquí usas next/image, perfecto; si usas <img>, pon alt="" */}
            <img src={meta.cover} alt="" className="h-full w-full object-contain" />
          </div>
        )}

        <div className="mt-8">
          <Markdown content={content} />
        </div>
      </article>
    </main>
  );
}
