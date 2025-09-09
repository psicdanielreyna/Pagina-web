import { getPostHtml, getPostsMeta } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  // <- imprescindible para que Netlify/SSG genere todas las rutas
  return getPostsMeta().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  if (!data) return {};
  const { meta } = data;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [{ url: meta.image }] : [],
    },
  };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);
  if (!data) return <div className="container py-16">Artículo no encontrado.</div>;

  const { meta, content } = data;

  return (
    <article className="container py-10">
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{meta.title}</h1>
        {meta.date && <p className="mt-2 text-sm text-evergreen/70">{formatDate(meta.date)}</p>}
        {meta.description && <p className="mt-3 text-lg text-evergreen/80">{meta.description}</p>}
      </header>

      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="my-6 mx-auto rounded-xl w-full max-w-3xl"
        />
      )}

      <div
        className="prose prose-lg max-w-none post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
