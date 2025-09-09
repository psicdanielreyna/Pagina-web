// components/LatestBlog.tsx
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function LatestBlog() {
  const posts = getPostsMeta(); // ya viene ordenado desc por fecha en tu lib
  if (!posts.length) {
    return (
      <section className="container py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-evergreen">Último del blog</h2>
        <p className="mt-2 text-evergreen/70">Aún no hay artículos.</p>
      </section>
    );
  }

  const [featured, ...rest] = posts;
  const side = rest.slice(0, 3);

  return (
    <section className="container py-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold text-evergreen">Último del blog</h2>
        <Link href="/blog" className="text-sm font-medium underline text-evergreen">
          Ver blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        {/* Destacado */}
        <article className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 p-4 md:p-6">
          <Link href={`/blog/${featured.slug}`} className="block group">
            {featured.image && (
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full max-w-[520px] aspect-[16/10] object-cover rounded-xl mx-auto mb-4 group-hover:opacity-95 transition"
              />
            )}
            <h3 className="text-2xl md:text-3xl font-extrabold text-evergreen group-hover:underline">
              {featured.title}
            </h3>
            <p className="mt-1 text-sm text-evergreen/70">{formatDate(featured.date)}</p>
            {featured.description && (
              <p className="mt-3 text-base text-evergreen/90">{featured.description}</p>
            )}
            <span className="mt-3 inline-block text-sm font-semibold underline text-evergreen">
              Página del artículo…
            </span>
          </Link>
        </article>

        {/* Columna lateral */}
        <div className="space-y-4">
          {side.map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 p-4"
            >
              <Link href={`/blog/${p.slug}`} className="flex gap-3 group items-start">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-14 h-14 object-cover rounded-lg ring-1 ring-black/5"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-evergreen group-hover:underline">
                    {p.title}
                  </h4>
                  <p className="text-xs text-evergreen/70">{formatDate(p.date)}</p>
                  {p.description && (
                    <p className="mt-1 text-sm text-evergreen/90 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                </div>
              </Link>
            </article>
          ))}
          <Link
            href="/blog"
            className="inline-block text-sm font-semibold underline text-evergreen"
          >
            Ver blog
          </Link>
        </div>
      </div>
    </section>
  );
}
