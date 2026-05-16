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
        <div className="rounded-2xl p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center" style={{ background: "var(--accent)" }}>
          <div>
            {featured.date && (
              <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
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
              <p className="mt-2 text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.75)" }}>
                {featured.excerpt}
              </p>
            )}
            <span className="mt-4 inline-block text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
              Leer artículo →
            </span>
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
      <div style={{ borderTop: "0.5px solid var(--border)" }}>
        {others.map((p, i) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="flex items-center gap-4 py-4 group px-1 rounded-lg transition-colors"
            style={{ borderBottom: "0.5px solid var(--border)" }}
          >
            <span className="text-xs font-medium min-w-[24px]" style={{ color: "var(--text-tertiary)" }}>
              {String(i + 2).padStart(2, "0")}
            </span>
            <span className="flex-1 text-sm group-hover:underline leading-snug" style={{ color: "var(--text-primary)" }}>
              {p.title}
            </span>
            {p.date && (
              <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-tertiary)" }}>
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