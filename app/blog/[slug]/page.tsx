// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

// ✅ Carga cliente para evitar CSR bailout si dentro hay hooks de cliente
const PostView = dynamic(() => import("@/components/PostView"), {
  ssr: false,
  loading: () => null,
});

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);
    const url = `https://danielreyna.com/blog/${meta.slug}`;

    const title =
      meta.title || "Artículo de psicología";
    const description =
      meta.excerpt || "Ansiedad, duelo, autoestima y terapia cognitivo-conductual.";

    // Fallback OG por si no hay cover
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
    };
  } catch {
    return {};
  }
}

function Inner({ slug }: { slug: string }) {
  try {
    const { meta, content } = getPostBySlug(slug);
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