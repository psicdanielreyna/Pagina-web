// components/LatestBlog.tsx
import Link from "next/link";
import Image from "next/image";
import { getPostsMeta } from "@/lib/posts";

export default async function LatestBlog() {
  const posts = await getPostsMeta();
  if (!posts || posts.length === 0) return null;

  // más reciente primero (asumiendo que posts ya vienen ordenados)
  const [featured, ...rest] = posts;

  return (
    <section className="container mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Destacado grande */}
        <article className="md:col-span-2 rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 p-4 md:p-6">
          <Link href={`/blog/${featured.slug}`} className="block group">
            {featured.cover && (
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  width={1200}
                  height={630}
                  className="h-56 w-full object-cover md:h-64"
                  priority
                />
              </div>
            )}
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-evergreen group-hover:underline">
              {featured.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(featured.date).toLocaleDateString("es-MX", {
                day: "2-digit", month: "short", year: "numeric",
              })}
            </p>
            {featured.excerpt && (
              <p className="mt-3 text-gray-800">{featured.excerpt}</p>
            )}
            <span className="mt-3 inline-block underline">Página del artículo…</span>
          </Link>
        </article>

        {/* Lista a la derecha */}
        <div className="space-y-4">
          {rest.slice(0, 3).map((p) => (
            <article key={p.slug} className="rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5 p-3">
              <Link href={`/blog/${p.slug}`} className="flex gap-3 group">
                {p.cover && (
                  <div className="shrink-0">
                    <Image
                      src={p.cover}
                      alt=""
                      width={160}
                      height={120}
                      className="h-20 w-28 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-evergreen group-hover:underline line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(p.date).toLocaleDateString("es-MX", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </p>
                  {p.excerpt && (
                    <p className="mt-1 text-sm text-gray-700 line-clamp-2">{p.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          ))}
          <Link href="/blog" className="text-evergreen underline inline-block mt-1">
            Ver blog
          </Link>
        </div>
      </div>
    </section>
  );
}
