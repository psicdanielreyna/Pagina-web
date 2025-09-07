import { getPostsMeta, getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const meta = getPostsMeta();
  return meta.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getPostHtml(params.slug);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { meta, html } = await getPostHtml(params.slug);

  return (
    <article className="container mx-auto px-4 py-10 prose prose-neutral max-w-3xl">
      <h1>{meta.title}</h1>
      {meta.description && <p className="lead">{meta.description}</p>}
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="rounded-2xl w-full my-6"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
