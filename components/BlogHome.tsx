import Image from "next/image";
import Link from "next/link";
import postsHome from "@/data/blog";

export default function BlogHome() {
  const [destacado, ...resto] = postsHome;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6">
        {/* Columna izquierda: posts pequeños */}
        <div className="order-2 lg:order-1 lg:col-span-1 space-y-4">
          {resto.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 hover:bg-slate-50 transition"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-100">
                <Image src={p.img} alt={p.alt} fill className="object-contain" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}

          <Link
            href="/blog"
            className="inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm"
          >
            Ver blog
          </Link>
        </div>

        {/* Columna derecha: post grande */}
        <Link
          href={destacado.href}
          className="order-1 lg:order-2 lg:col-span-2 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition"
        >
          <div className="p-6">
            <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-xl bg-slate-50">
              <Image
                src={destacado.img}
                alt={destacado.alt}
                fill
                className="object-contain"
                sizes="(min-width:1024px) 66vw, 100vw"
                priority
              />
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">{destacado.title}</h3>
              <p className="mt-1 text-slate-600">{destacado.excerpt}</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
