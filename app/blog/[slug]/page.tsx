import Image from "next/image";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";

const query = groq`*[_type=="post" && slug.current==$slug][0]{
  title, excerpt, mainImage, body, publishedAt
}`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug }).catch(() => null);
  if (!post) return <div className="container py-12">No encontrado.</div>;

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{post.title}</h1>

      {post.mainImage && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted/50">
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 960px, 100vw"
          />
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert max-w-none mt-8">
        {post.body ? <PortableText value={post.body} /> : null}
      </article>
    </div>
  );
}
