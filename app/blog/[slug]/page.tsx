import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import groq from "groq";
import { client } from "@/lib/sanity.client";

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  // trae portada con asset resuelto y URL por si la necesitas directa
  "cover": cover{
    ...,
    asset->,
    "url": asset->url
  },
  // si existe 'content' úsalo; si no, usa 'body'
  "content": coalesce(content, body)
}`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div className="container px-4 py-10">No encontrado.</div>;
  }

  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-2">{children}</h3>,
      normal: ({ children }) => <p className="leading-7 my-4 text-zinc-700">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 pl-4 italic my-6 text-zinc-600">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-6 space-y-1 my-4">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-6 space-y-1 my-4">{children}</ol>,
    },
    marks: {
      link: ({ value, children }) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer" className="underline">
          {children}
        </a>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    },
    types: {
      image: ({ value }) => {
        const src = urlFor(value).width(1200).height(700).fit("max").url();
        const alt = value?.alt || "Imagen del post";
        return (
          <div className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="rounded-xl mx-auto" />
          </div>
        );
      },
    },
  };

  return (
    <article className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{post.title}</h1>

      {/* Portada opcional */}
      {post.crop && (
        <div className="my-8">
          <Image
            src={urlFor(post.crop).width(1600).height(900).fit("crop").url()}
            alt={post.crop?.alt || "Portada"}
            width={1600}
            height={900}
            className="rounded-2xl"
          />
        </div>
      )}

      {/* Contenido */}
      {Array.isArray(post.content) && post.content.length > 0 ? (
        <PortableText value={post.content} components={components} />
      ) : (
        <p className="text-zinc-500 mt-6">Próximamente…</p>
      )}
    </article>
  );
}
