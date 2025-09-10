// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostHtml, getPostsMeta } from "@/lib/posts";

type Props = { params: { slug: string } };

// Metadata por página (maneja null de forma segura)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostHtml(params.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "El artículo que buscas no existe o fue movido.",
    };
  }

  const { meta } = post;

  return {
    title: meta.title,
    description: meta.description ?? "",
    openGraph: {
      title: meta.title,
      description: meta.description ?? "",
      images: meta.image ? [{ url: meta.image }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description ?? "",
      images: meta.image ? [meta.image] : undefined,
    },
  };
}

// Rutas estáticas (si tienes drafts, getPostsMeta ya debe filtrarlos en prod)
export async function generateStaticParams() {
  const posts = await getPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostHtml(params.slug);

  if (!post) {
    notFound();
  }

  const { meta, content } = post;

  return (
    <article className="container mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-evergreen">
          {meta.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {meta.date ? new Date(meta.date).toLocaleDateString("es-MX",
            { year: "numeric", month: "long", day: "numeric" }) : null}
        </p>
        {meta.image ? (
          <img
            src={meta.image}
            alt={meta.title}
            className="mt-6 w-full max-w-3xl mx-auto rounded-xl object-cover"
          />
        ) : null}
      </header>

      <div
        className="prose prose-lg post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
