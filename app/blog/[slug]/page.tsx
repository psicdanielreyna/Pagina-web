import { getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";
import Image from "next/image";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, html } = await getPostHtml(params.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 prose prose-lg prose-headings:font-bold prose-img:rounded-xl prose-img:mx-auto">
      <h1>{meta.title}</h1>
      <p className="text-muted-foreground">{meta.date}</p>

      {meta.image && (
        <Image
          src={meta.image}
          alt={meta.title}
          width={1200}
          height={630}
          className="rounded-xl mx-auto my-6 w-full max-w-[960px] h-auto object-cover"
          priority
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}