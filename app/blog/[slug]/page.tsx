// app/blog/[slug]/page.tsx
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import groq from "groq";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  date?: string;
  cover?: { asset?: { _ref: string }; alt?: string };
  content?: any[];
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  date,
  cover,
  content
}`;

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = (await client.fetch(query, { slug: params.slug })) as Post | null;

  if (!post) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p className="text-lg">No encontramos este artículo.</p>
        <Link href="/blog" className="underline">Volver al blog</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-10 prose prose-neutral max-w-3xl">
      <h1 className="mb-2">{post.title}</h1>
      {post.date && (
        <p className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}

      {post.cover?.asset && (
        <div className="my-8">
          <Image
            src={urlFor(post.cover).width(1600).height(900).fit("crop").url()}
            alt={post.cover.alt || "Portada"}
            width={1600}
            height={900}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      )}

      {post.content?.length ? (
        <PortableText
          value={post.content}
          components={{
            types: {
              image: ({ value }) => {
                if (!value?.asset?._ref) return null;
                const src = urlFor(value).width(1200).fit("max").url();
                const alt = value?.alt || "Imagen del artículo";
                return (
                  <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={800}
                    className="rounded-lg my-6"
                  />
                );
              },
            },
            block: {
              h2: ({ children }) => <h2 className="mt-10 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-8 mb-3">{children}</h3>,
              normal: ({ children }) => <p className="leading-7">{children}</p>,
            },
            marks: {
              link: ({ value, children }) => {
                const href = value?.href || "#";
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
            },
            list: {
              bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
              number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
            },
          }}
        />
      ) : (
        <p>Próximamente…</p>
      )}
    </main>
  );
}
