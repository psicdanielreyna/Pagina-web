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
  // ej. "07 sep 2025"
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
        <ul className="mt-8 space-y-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl ring-1 ring-black/5 hover:ring-black/10 transition bg-white"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex gap-6 p-4 md:p-5"
              >
                {/* Miniatura */}
                {post.image ? (
                  <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl md:h-32 md:w-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="h-28 w-40 shrink-0 rounded-xl bg-neutral-100 md:h-32 md:w-48" />
                )}

                {/* Texto */}
                <div className="min-w-0">
                  <h2 className="line-clamp-2 text-xl font-semibold text-neutral-900 underline-offset-4 hover:underline">
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

                  <span className="mt-3 inline-block text-sm font-medium text-emerald-700">
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