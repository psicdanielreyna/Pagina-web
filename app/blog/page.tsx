// app/blog/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Daniel Reyna",
  description:
    "Artículos de psicología y bienestar: ansiedad, hábitos, relaciones y más.",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso)
    .toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/\./g, "");
}

export default async function BlogPage() {
  const posts = getPostsMeta();

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">
        Blog
      </h1>

      {!posts.length ? (
        <p className="mt-10 text-neutral-600">No hay artículos todavía.</p>
      ) : (
        <ul className="mt-8 divide-y divide-neutral-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-6"
              >
                {/* Miniatura visible */}
                {post.image ? (
                  <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="176px"
                      className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="h-28 w-44 shrink-0 rounded-xl bg-neutral-100" />
                )}

                {/* Contenido */}
                <div className="min-w-0">
                  <h2 className="line-clamp-2 text-xl font-semibold text-neutral-900 underline-offset-4 group-hover:underline">
                    {post.title}
                  </h2>

                  <div className="mt-1 text-sm text-neutral-500">
                    {formatDate(post.date)}
                  </div>

                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-neutral-700">
                      {post.description}
                    </p>
                  )}

                  <span className="mt-3 inline-block text-sm font-semibold text-emerald-700">
                    Página del artículo…
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}