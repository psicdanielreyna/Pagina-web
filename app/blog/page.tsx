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

function formatDate(iso: string) {
  // Si viene vacío evitamos Date inválida
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function BlogPage() {
  const posts = getPostsMeta();

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-6 text-neutral-600">No hay artículos todavía.</p>
      ) : (
        <ul className="mt-8 grid gap-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-4 sm:flex-row"
              >
                {/* Imagen destacada si existe */}
                {post.image ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:w-56">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      // Evita configurar dominios remotos ahora mismo
                      unoptimized
                      priority={false}
                    />
                  </div>
                ) : null}

                <div className="flex-1">
                  <h2 className="text-xl font-semibold leading-snug underline-offset-4 hover:underline">
                    {post.title}
                  </h2>
                  {post.date ? (
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatDate(post.date)}
                    </p>
                  ) : null}
                  {post.description ? (
                    <p className="mt-2 line-clamp-3 text-neutral-700">
                      {post.description}
                    </p>
                  ) : null}

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