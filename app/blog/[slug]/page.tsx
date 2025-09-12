import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import Markdown from "@/components/Markdown";

function safeDateLabel(input?: string) {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null; // 👈 evita RangeError
  try {
    return d.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

// ---- SSG params ----
export function generateStaticParams() {
  try {
    const slugs = getAllSlugs() || [];
    return slugs.map((slug) => ({ slug }));
  } catch (e) {
    console.error("[generateStaticParams] error:", e);
    return []; // 👈 nunca tronar
  }
}

type Props = { params: { slug: string } };

// ---- SEO ----
export function generateMetadata({ params }: Props): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: "Artículo" };
    const { meta } = post;
    return {
      title: meta.title,
      description: meta.excerpt ?? undefined,
      openGraph: {
        title: meta.title ?? "",
        description: meta.excerpt ?? "",
        images: meta.cover ? [meta.cover] : [],
        type: "article",
      },
    };
  } catch (e) {
    console.error("[generateMetadata] error:", e);
    return { title: "Artículo" }; // 👈 no tronar
  }
}

export default function BlogPostPage({ params }: Props) {
  try {
    const post = getPostBySlug(params.slug);
    if (!post) return notFound();
    const { meta, content } = post;

    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article>
          <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>

          {(() => {
            const label = safeDateLabel(meta.date);
            return label ? (
              <p className="mt-2 text-sm text-zinc-500">{label}</p>
            ) : null;
          })()}

          {meta.cover && (
            <div className="relative mt-6 w-full aspect-[16/9] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
              {/* puedes migrar a next/image si quieres */}
              <img src={meta.cover} alt="" className="h-full w-full object-contain" />
            </div>
          )}

          <div className="mt-8">
            <Markdown content={content} />
          </div>
        </article>
      </main>
    );
  } catch (e) {
    console.error("[BlogPostPage] error:", e);
    return notFound(); // 👈 ante cualquier excepción
  }
}
