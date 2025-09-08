// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPostsMeta } from "@/lib/posts";

// ──────────────────────────────────────────────────────────
// SEO
// ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Blog | Daniel Reyna",
  description:
    "Artículos de psicología y bienestar: ansiedad, hábitos, relaciones y más.",
};

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────
function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    // No retornamos Date como hijo de React: devolvemos string formateada
    return new Date(iso).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

// ──────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────
export default async function BlogPage() {
  const posts = getPostsMeta();

  return (
    <section className="mx-auto max-w-5xl px-6 sm:px-8">
      <h1 className="mt-10 mb-8 text-4xl font-extrabold tracking-tight">
        Blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-neutral-500">No hay artículos todavía.</p>
      ) : (
        <ul className="divide-y divide-neutral-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <article className="grid grid-cols-1 gap-5 md:grid-cols-[220px,1fr] md:gap-8">
                {/* Thumb */}
                {post.image ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-md"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="object-cover transition-transform duration-200 hover:scale-[1.02]"
                      priority={false}
                    />
                  </Link>
                ) : (
                  <div className="hidden md:block h-[165px] rounded-md bg-neutral-100" />
                )}

                {/* Copy */}
                <div>
                  <h2 className="text-2xl font-semibold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {formatDate(post.date)}
                  </p>

                  {post.description && (
                    <p className="mt-3 max-w-2xl leading-relaxed text-neutral-700">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-emerald-700 underline underline-offset-4 hover:opacity-90"
                    >
                      Página del artículo…
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}