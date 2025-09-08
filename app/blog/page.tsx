// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Daniel Reyna",
  description:
    "Artículos de psicología y bienestar: ansiedad, hábitos, relaciones y más.",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function BlogPage() {
  const posts = getPostsMeta();

  return (
    <section className="mx-auto max-w-4xl px-6 sm:px-8 md:px-10">
      <h1 className="mb-8 mt-10 text-4xl font-extrabold tracking-tight">Blog</h1>

      {posts.length === 0 && (
        <p className="text-neutral-500">No hay artículos todavía.</p>
      )}

      <div className="space-y-12">
        {posts.map((post) => {
          const href = `/blog/${post.slug}`;
          const date = formatDate(post.date);

          return (
            <article key={post.slug} className="pb-12 border-b border-neutral-200">
              {/* Título grande, estilo editorial */}
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
                <Link href={href} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              {/* Fecha */}
              {date && (
                <div className="mt-2 text-sm text-neutral-500">{date}</div>
              )}

              {/* Imagen amplia (si existe) */}
              {post.image && (
                <div className="mt-6">
                  <Link href={href} aria-label={`Abrir ${post.title}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1600}
                      height={900}
                      sizes="(min-width: 1024px) 896px, (min-width: 640px) 600px, 90vw"
                      className="w-full h-auto rounded-md"
                      priority={false}
                    />
                  </Link>
                </div>
              )}

              {/* Extracto */}
              {post.description && (
                <p className="mt-6 text-lg leading-relaxed text-neutral-800">
                  {post.description}
                </p>
              )}

              {/* Link “Página del artículo…” al estilo simple */}
              <div className="mt-4">
                <Link
                  href={href}
                  className="text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
                >
                  Página del artículo…
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}