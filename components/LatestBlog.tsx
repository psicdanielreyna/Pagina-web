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
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-4">

{/* Destacado grande — izquierda */}
<Link href={`/blog/${featured.slug}`} className="block group">
  <div
    className="rounded-2xl overflow-hidden flex flex-col h-full"
    style={{ background: "var(--accent)" }}
  >
    {/* Imagen arriba */}
    {featured.cover && (
      <div className="relative h-44 w-full shrink-0">
        <img
          src={featured.cover}
          alt={featured.title}
          className="w-full h-full object-cover"
        />
      </div>
    )}

    {/* Texto abajo */}
    <div className="p-7 flex flex-col flex-1">
      {featured.date && (
        <p className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
          {new Date(featured.date).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
          })}
        </p>
      )}
      <h3 className="text-xl md:text-2xl font-medium text-white leading-snug group-hover:underline mb-2">
        {featured.title}
      </h3>
      {featured.excerpt && (
        <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.7)" }}>
          {featured.excerpt}
        </p>
      )}
      <span className="mt-4 inline-block text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
        Leer artículo →
      </span>
    </div>
  </div>
</Link>

        {/* Lista compacta — derecha */}
        <div className="flex flex-col gap-3">
          {others.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-center gap-3 rounded-2xl p-4 flex-1 transition-colors"
              style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
            >
              <span
                className="text-xs font-medium min-w-[20px] shrink-0"
                style={{ color: "var(--text-tertiary)" }}
              >
                {String(i + 2).padStart(2, "0")}
              </span>
              <span
                className="flex-1 text-sm leading-snug group-hover:underline"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </span>
              {p.date && (
                <span
                  className="text-xs whitespace-nowrap shrink-0"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {new Date(p.date).toLocaleDateString("es-MX", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}