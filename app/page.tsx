// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

// ==== DATA (mock) ====
type Recurso = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

const recursos: Recurso[] = [
  {
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/tienda/apagar-mente",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada del manual Cómo apagar tu mente",
  },
  {
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/tienda/el-arte-de-creer-en-ti",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada del manual El arte de creer en ti",
  },
];

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

const posts: Post[] = [
  {
    slug: "post-1",
    title: "Post 1",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 1",
  },
  {
    slug: "post-2",
    title: "Post 2",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 2",
  },
  {
    slug: "post-3",
    title: "Post 3",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 3",
  },
];

export default function HomePage() {
  const [destacado, ...resto] = posts;

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-slate-500 mb-3">
              Psicoterapia <span className="mx-2">|</span> Recursos prácticos
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              Daniel Reyna — Acompañamiento con herramientas claras y humanas
            </h1>
            <p className="text-lg text-slate-700 mb-8">
              Sesiones individuales y de pareja, y materiales descargables para
              avanzar a tu ritmo.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center rounded-full px-6 py-3
                           border border-slate-300 text-slate-700 transition
                           hover:bg-slate-50 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
              >
                Ver tienda
              </Link>
              <Link
                href="/agenda"
                className="inline-flex items-center justify-center rounded-full px-6 py-3
                           text-white font-medium bg-emerald-700 shadow-md transition
                           hover:bg-emerald-800 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700/60
                           active:scale-[0.98]"
              >
                Agendar cita
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/header.png"
              alt="Consulta psicológica"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* RECURSOS DESTACADOS: mismo alto/grosor que tienda */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Recursos destacados
            </h2>
            <Link
              href="/tienda"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {recursos.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-48 md:h-56 bg-slate-100">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>

                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm">{p.excerpt}</p>
                </div>

                <div className="p-4 pt-0">
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 group-hover:bg-slate-50">
                    Leer más
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG + NEWSLETTER (post más reciente grande + 2 a la derecha) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          {/* Blog teaser */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Último del blog
            </h2>
            <p className="mt-1 text-slate-600">
              Lecturas breves y útiles para tu día a día.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {/* grande */}
              <Link
                href={destacado.href}
                className="rounded-xl border border-slate-100 overflow-hidden hover:bg-slate-50 transition lg:row-span-2"
              >
                <div className="relative h-40 md:h-48 bg-slate-100">
                  <Image
                    src={destacado.img}
                    alt={destacado.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {destacado.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {destacado.excerpt}
                  </p>
                </div>
              </Link>

              {/* dos pequeños a la derecha */}
              {resto.slice(0, 2).map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="flex gap-4 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-100">
                    <Image src={p.img} alt={p.alt} fill className="object-cover" />
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
