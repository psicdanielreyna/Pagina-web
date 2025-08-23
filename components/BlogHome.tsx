// components/BlogHome.tsx
import Image from "next/image";
import Link from "next/link";
import { postsHome } from "@/data/blog";

export default function BlogHome() {
  const [destacado, ...resto] = postsHome;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Último del blog
          </h2>
          <Link
            href="/blog"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Post destacado a la IZQUIERDA (grande) */}
          <Link
            href={destacado.href}
            className="lg:col-span-2 block rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={destacado.img}
                alt={destacado.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                {destacado.title}
              </h3>
              <p className="mt-2 text-slate-600">{destacado.excerpt}</p>
            </div>
          </Link>

          {/* Resto a la DERECHA (chicos, listados en columna) */}
          <div className="space-y-4">
            {resto.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-3 hover:bg-slate-50 transition"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
