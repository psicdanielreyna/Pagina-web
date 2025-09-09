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
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = getPostsMeta(); // síncrono; lee /content/posts/*.md

  return (
    <section className="container px-6 py-16">
      <h1 className="text-5xl font-extrabold mb-10">Blog</h1>

      {!posts?.length ? (
        <p className="text-lg opacity-70">No hay artículos todavía.</p>
      ) : (
        <ul className="space-y-12">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="flex items-start gap-6 border-b border-black/10 pb-10"
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  width={320}
                  height={214}
                  className="aspect-[3/2] w-[320px] rounded-xl object-cover"
                />
              ) : (
                <div className="hidden md:block w-[320px] h-[214px] rounded-xl bg-black/5" />
              )}

              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="underline-offset-2 hover:underline"
                  >
                    {p.title}
                  </Link>
                </h2>

                <div className="mt-2 text-sm opacity-70">
                  {formatDate(p.date)}
                </div>

                {p.description && (
                  <p className="mt-3 max-w-2xl">{p.description}</p>
                )}

                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-3 inline-block font-medium underline text-emerald-700"
                >
                  Página del artículo…
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
