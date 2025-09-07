// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

// Para SSG
export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostHtml(params.slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostHtml(params.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{post.date}</p>
      </header>

      {post.image && (
        <div className="mb-8">
          <Image
            src={post.image}
            alt={post.title}
            width={1280}
            height={720}
            className="mx-auto h-auto max-h-[480px] w-auto max-w-full rounded-xl object-cover"
            priority
          />
        </div>
      )}

      {/* Contenido del post (HTML) */}
      <div
        className="prose prose-neutral max-w-none prose-img:mx-auto prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <footer className="mt-12">
        <Link
          href="/blog"
          className="inline-block rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          ← Volver al blog
        </Link>
      </footer>
    </article>
  );
}