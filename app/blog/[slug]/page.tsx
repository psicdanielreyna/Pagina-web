// app/blog/[slug]/page.tsx
import groq from "groq";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Portable from "@/components/Portable";

export const revalidate = 60;
export const dynamicParams = true;

type Post = {
  _id: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  cover?: any;
  content?: any; // campo array del Portable Text
  slug: { current: string };
};

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  publishedAt,
  cover,
  content,
  slug
}`;

const SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current }`;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch<Post>(POST_QUERY, { slug: params.slug });

  if (!post?._id) return notFound();

  const coverUrl = post.cover
    ? urlFor(post.cover).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <article className="py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{post.title}</h1>
          {post.excerpt && <p className="mt-2 text-slate-600">{post.excerpt}</p>}
          <p className="mt-2 text-xs text-slate-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </header>

        {coverUrl && (
          <div className="my-8 overflow-hidden rounded-2xl">
            <Image
              src={coverUrl}
              alt={post.cover?.alt || post.title}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Contenido rico */}
        {post.content?.length ? (
          <div className="prose prose-slate max-w-none">
            <Portable value={post.content} />
          </div>
        ) : (
          <p className="text-slate-500">Este post aún no tiene contenido.</p>
        )}
      </div>
    </article>
  );
}
