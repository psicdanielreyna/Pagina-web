import Image from "next/image";
import { client } from "@/lib/sanity.client";
import groq from "groq";
import { PortableText } from "@portabletext/react";

type Post = {
  title: string;
  slug: { current: string };
  date?: string;
  cover?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  };
  content?: any[];
  body?: any[]; // por compatibilidad si el campo se llama body
};

export const dynamic = "force-dynamic";

const POST_QUERY = groq`*[_type=="post" && slug.current==$slug][0]{
  title,
  slug,
  date,
  cover{
    asset->{url},
    alt
  },
  // acepta ambas variantes
  content[]{
    ...,
    _type == "image" => { asset->{url}, alt }
  },
  body[]{
    ...,
    _type == "image" => { asset->{url}, alt }
  }
}`;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = (await client.fetch<Post>(POST_QUERY, { slug: params.slug })) || null;

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Artículo no encontrado</h1>
      </div>
    );
  }

  const blocks = (post.content && post.content.length > 0 ? post.content : post.body) || [];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>

      {post.cover?.asset?.url && (
        <div className="my-8">
          <Image
            src={post.cover.asset.url}
            alt={post.cover.alt || "Portada"}
            width={1600}
            height={900}
            className="h-auto w-full rounded-xl object-cover"
            priority
          />
        </div>
      )}

      {blocks.length > 0 ? (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <PortableText value={blocks} />
        </div>
      ) : (
        <p className="text-muted-foreground mt-6">Próximamente…</p>
      )}
    </article>
  );
}
