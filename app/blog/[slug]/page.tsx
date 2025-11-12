// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPublishedSlugs, getPostBySlug } from "@/lib/posts";

export const revalidate = 1800; // 30min

// ✅ Carga cliente por si PostView usa hooks de cliente
const PostView = dynamic(() => import("@/components/PostView"), {
  ssr: false,
  loading: () => null,
});

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);

    // si es draft o futuro, no indexar por seguridad (aunque de todos modos 404)
    const isFuture = meta.date ? new Date(meta.date) > new Date() : false;
    const noindex = meta.draft || isFuture || meta.noindex;

    const url = `https://danielreyna.com/blog/${meta.slug}`;
    const title = meta.seoTitle || meta.title || "Artículo de psicología";
    const description =
      meta.seoDescription ||
      meta.excerpt ||
      "Ansiedad, duelo, autoestima y terapia cognitivo-conductual.";

    const ogImage = meta.cover ?? `/og/blog/${meta.slug}.jpg`;

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title,
        description,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
      robots: noindex ? { index: false, follow: true } : undefined,
    };
  } catch {
    return {};
  }
}

function Inner({ slug }: { slug: string }) {
  try {
    const { meta, content } = getPostBySlug(slug);
    const isFuture = meta.date ? new Date(meta.date) > new Date() : false;
    if (meta.draft || isFuture) {
      return notFound();
    }
    return <PostView meta={meta} content={content} />;
  } catch {
    return notFound();
  }
}

export default function BlogPostPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-600">Cargando…</div>}>
      <Inner slug={params.slug} />
    </Suspense>
  );
}