// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

type Card = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

const destacados: Destacado[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    alt: "Cómo apagar tu mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    alt: "El arte de creer en ti",
  },
  {
    slug: "ansiedad-en-3-pasos",
    title: "Ansiedad en 3 pasos prácticos",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    alt: "Ansiedad en 3 pasos",
  },
];

<section className="py-12 md:py-16">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
        Recursos destacados
      </h2>
      <Link
        href="/blog"
        className="text-emerald-700 hover:text-emerald-800 font-medium"
      >
        Ver todos
      </Link>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {destacados.map((p) => {
        const imgSrc = p.img ?? `/images/blog/${p.slug}.jpg`;
        return (
          <Link
            key={p.slug}
            href={p.href}
            className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={imgSrc}
                alt={p.alt}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/blog/fallback-post.jpg";
                }}
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-1 text-slate-600 text-sm line-clamp-2">
                {p.excerpt}
              </p>

              <div className="mt-4">
                <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
                  Leer más
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
</section>

// Pequeño teaser para la sección “Último del blog”
const teaserPosts: Card[] = [
  {
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/post-2.png",
    alt: "El arte de creer en ti",
  },
  {
    title: "Ansiedad en 3 pasos prácticos",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/post-3.png",
    alt: "Ansiedad en 3 pasos",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="py-12 md:py-16">
  <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900">
        Último del blog
      </h2>
      <p className="mt-1 text-slate-600">
        Lecturas breves y útiles para tu día a día.
      </p>

      <div className="mt-6 space-y-4">
        {destacados.slice(1, 3).map((p) => (
          <Link
            key={p.slug}
            href={p.href}
            className="flex gap-4 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
          >
            <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-100">
              <Image
                src={p.img ?? `/images/blog/${p.slug}.jpg`}
                alt={p.alt}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/blog/fallback-post.jpg";
                }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {p.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/blog"
          className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50"
        >
          Ver blog
        </Link>
      </div>
    </div>

    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <Newsletter />
    </div>
  </div>
</section>

      {/* RECURSOS DESTACADOS */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Recursos destacados
            </h2>
            <Link
              href="/blog"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {destacados.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={p.img} alt={p.alt} fill className="object-cover" />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm line-clamp-2">
                    {p.excerpt}
                  </p>

                  <div className="mt-4">
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700">
                      Leer más
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG + NEWSLETTER */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          {/* Teaser Blog */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Último del blog
            </h2>
            <p className="mt-1 text-slate-600">
              Lecturas breves y útiles para tu día a día.
            </p>

            <div className="mt-6 space-y-4">
              {teaserPosts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex gap-4 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{p.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Ver blog
              </Link>
            </div>
          </div>

          {/* Newsletter (Client Component) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
