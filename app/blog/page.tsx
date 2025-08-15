// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/posts";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  // ordena por fecha DESC
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [featured, ...rest] = sorted;
  const secundarios = rest.slice(0, 2);

  return (
    <div className="space-y-10">
      {/* 1 grande + 2 a la derecha */}
      {featured && (
        <section className="grid lg:grid-cols-3 gap-6">
          {/* grande */}
          <Link
            href={`/blog/${featured.slug}`}
            className="block group rounded-2xl border overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-white">
              <Image
                src={featured.image ?? "/blog/fallback.jpg"}
                alt={featured.title}
                fill
                className="object-contain bg-white group-hover:scale-[1.02] transition-transform"
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl md:text-2xl font-semibold group-hover:underline">
                {featured.title}
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                {new Date(featured.date).toLocaleDateString()}
              </p>
              <p className="text-neutral-700 mt-2">{featured.excerpt}</p>
            </div>
          </Link>

          {/* dos a la derecha */}
          <div className="space-y-6">
            {secundarios.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block group rounded-2xl border overflow-hidden"
              >
                <div className="grid grid-cols-5">
                  <div className="col-span-2 relative aspect-[4/3] bg-white">
                    <Image
                      src={p.image ?? "/blog/fallback.jpg"}
                      alt={p.title}
                      fill
                      className="object-contain bg-white"
                      sizes="200px"
                    />
                  </div>
                  <div className="col-span-3 p-4">
                    <h3 className="font-semibold group-hover:underline">
                      {p.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {new Date(p.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-neutral-700 mt-2 line-clamp-3">
                      {p.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* resto en grilla (opcional) */}
      {/* <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.slice(3).map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border overflow-hidden">
            <div className="relative aspect-[16/10] bg-white">
              <Image src={p.image ?? "/blog/fallback.jpg"} alt={p.title} fill className="object-contain bg-white" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold group-hover:underline">{p.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">
                {new Date(p.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-neutral-700 mt-2 line-clamp-3">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </section> */}
    </div>
  );
}
