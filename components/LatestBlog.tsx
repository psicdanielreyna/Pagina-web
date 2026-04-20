import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 1800;

export default async function LatestBlog() {
  const posts = await getPublishedPosts();
  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts;
  const others = rest.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6">
      {/* Artículo destacado */}
      <Link href={`/blog/${featured.slug}`} className="block group mb-4">
        <div className="rounded-2xl bg-emerald-700 p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            {featured.date && (
              <p className="text-xs font-medium text-emerald-300 uppercase tracking-wide mb-3">
                {new Date(featured.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            )}
            <h3 className="text-xl md:text-2xl font-medium text-white leading-snug group-hover:underline">
              {featured.title}
            </h3>
            {featured.excerpt && (
              <p className="mt-2 text-sm text-emerald-200 line-clamp-2">{featured.excerpt}</p>
            )}
            <span className="mt-4 inline-block text-xs text-emerald-300">Leer artículo →</span>
          </div>
          {featured.cover && (
            <img
              src={featured.cover}
              alt={featured.title}
              className="w-24 h-28 md:w-28 md:h-32 object-cover rounded-xl shrink-0"
              loading="lazy"
            />
          )}
        </div>
      </Link>

      {/* Lista de otros artículos */}
      <div className="divide-y divide-black/8 border-t border-black/8">
        {others.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex items-center gap-4 py-4 group hover:bg-zinc-50 px-1 rounded-lg transition-colors"
          >
            <span className="text-xs font-medium text-zinc-400 min-w-[24px]">
              {String(i + 2).padStart(2, "0")}
            </span>
            <span className="flex-1 text-sm text-zinc-800 group-hover:underline leading-snug">
              {p.title}
            </span>
            {p.date && (
              <span className="text-xs text-zinc-400 whitespace-nowrap">
                {new Date(p.date).toLocaleDateString("es-MX", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}