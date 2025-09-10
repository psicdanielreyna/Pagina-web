// components/LatestBlog.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export default async function LatestBlog() {
  const posts = await getAllPostsMeta();
  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts;
  const others = rest.slice(0, 3);

  const coverFeatured = featured.cover ?? undefined;

  return (
    <section className="container mx-auto max-w-6xl px-4 md:px-6 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Destacado */}
        <article className="md:col-span-2 rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 p-4 md:p-6">
          <Link href={`/blog/${featured.slug}`} className="block group">
            {coverFeatured && (
              <img
                src={coverFeatured}
                alt={featured.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
                loading="lazy"
              />
            )}
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-evergreen group-hover:underline">
              {featured.title}
            </h3>
            {featured.date ? (
              <p className="mt-1 text-sm text-gray-600">
                {new Date(featured.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
            {featured.excerpt ? (
              <p className="mt-3 text-gray-800">{featured.excerpt}</p>
            ) : null}
          </Link>
        </article>

        {/* Lista lateral */}
        <div className="space-y-4">
          {others.map((p) => {
            const cover = p.cover ?? undefined;
            return (
              <article key={p.slug} className="rounded-xl bg-white/60 shadow-sm ring-1 ring-black/5 p-4">
                <Link href={`/blog/${p.slug}`} className="block group">
                  <div className="flex gap-3">
                    {cover && (
                      <img
                        src={cover}
                        alt=""
                        className="w-28 h-20 object-cover rounded-lg shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-evergreen leading-snug group-hover:underline">
                        {p.title}
                      </h4>
                      {p.date ? (
                        <p className="mt-1 text-xs text-gray-600">
                          {new Date(p.date).toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
