// app/blog/[slug]/page.tsx
import Image from "next/image";
import groq from "groq";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { PortableText } from "@portabletext/react";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  date?: string;
  cover?: any;
  content: any[];
};

const onePost = groq`*[_type=="post" && slug.current == $slug][0]{
  _id, title, slug, excerpt, date, cover, content
}`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await sanityClient.fetch(
    groq`*[_type=="post" && defined(slug.current)]{slug}`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await sanityClient.fetch<Post>(onePost, { slug: params.slug });

  if (!post) {
    return <div className="container mx-auto px-4 py-16">Post no encontrado.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-10 prose prose-slate max-w-3xl">
      <h1>{post.title}</h1>
      {post.date && <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>}
      {post.cover && (
        <div className="relative w-full h-80 my-6 rounded-xl overflow-hidden">
          <Image
            src={urlFor(post.cover).width(1600).height(900).fit("crop").url()}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      <PortableText value={post.content} />
    </article>
  );
}
