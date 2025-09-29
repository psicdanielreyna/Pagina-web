// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import PostView from "@/components/PostView";

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
      meta.excerpt ||
      "Ansiedad, duelo, autoestima y terapia cognitivo-conductual.";

    // Si usas cover como OG (opcional)
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
      // Si en el futuro añades noindex/nofollow al frontmatter, lo mapearíamos aquí
      // robots: { index: !meta.noindex, follow: !meta.nofollow },
    };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: Props) {
  try {
    const { meta, content } = getPostBySlug(params.slug);
    return <PostView meta={meta} content={content} />;
  } catch {
    return notFound();
  }
}
