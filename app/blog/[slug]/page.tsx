// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPostHtml } from "@/lib/posts";

type Props = { params: { slug: string } };

// Para SSG: define todas las rutas de posts
export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

// SEO por página
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostHtml(params.slug);
  if (!data) return { title: "Artículo no encontrado" };

  const { meta } = data;
  const title = meta.title || params.slug;
  const description = meta.excerpt || "Artículo del blog";
  const cover = meta.cover || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: cover ? [{ url: cover }] : undefined,
      type: "article",
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const data = await getPostHtml(params.slug);
  if (!data) notFound();

  const { meta, contentHtml } = data;

  return (
    <article className="post-content">
      {/* Cabecera del post */}
      <header className="container mx-auto max-w-3xl px-4 md:px-6 pt-10 md:pt-14">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-evergreen">
          {meta.title}
        </h1>

        {meta.date ? (
          <p className="mt-3 text-sm text-gray-600">
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
      </header>

      {/* Imagen de portada (opcional) */}
      {meta.cover ? (
        <div className="container mx-auto max-w-4xl px-4 md:px-6 mt-6">
          {/* Usa <img> para evitar problemas si la imagen es remota sin configurar next/image */}
          <img
            src={meta.cover}
            alt={meta.title}
            className="w-full h-auto rounded-xl"
            loading="lazy"
          />
        </div>
      ) : null}

      {/* Contenido HTML del post */}
      <section className="container mx-auto max-w-3xl px-4 md:px-6 mt-8 mb-16 prose">
        {/* contentHtml viene ya convertido desde markdown a HTML */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </section>
    </article>
  );
}
