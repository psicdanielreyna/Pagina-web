// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

type Recurso = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

// ====== DATA
const recursosDestacados: Recurso[] = [
  {
    slug: "apagar-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/tienda/apagar-mente",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada del manual Cómo apagar tu mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/tienda/el-arte-de-creer-en-ti",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada del manual El arte de creer en ti",
  },
];

const blogPosts: Post[] = [
  {
    slug: "el-arte-de-creer-en-ti",
    title: "Post 1",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 1",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Post 2",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 2",
  },
  {
    slug: "apagar-mente",
    title: "Post 3",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 3",
  },
];

export default function HomePage() {
  const [destacado, ...resto] = blogPosts;

  return (
    <div className="space-y-16">
      {/* ===== HERO / Recibimiento ===== */}
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
                className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-slate-300 text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
              >
                Ver tienda
              </Link>

              <Link
                href="/agenda"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-medium bg-emerald-700 shadow-md transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700/60 active:scale-[0.98]"
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

      {/* ===== RECURSOS DESTACADOS (compactos) ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
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

          {/* Dos tarjetas, más angostas y de altura contenida */}
          <div className="grid md:grid-cols-2 gap-6">
            {recursosDestacados.map((r) => (
              <Link
                key={r.slug}
                href={r.href}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative w-full h-[220px] bg-slate-50">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width:768px) 100vw, 640px"
                    priority
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{r.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm line-clamp-2">
                    {r.excerpt}
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

      {/* ===== BLOG + NEWSLETTER ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          {/* Blog: pequeños a la izquierda (col 1), grande a la derecha (col-span-2) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Último del blog
            </h2>
            <p className="mt-1 text-slate-600">
              Lecturas breves y útiles para tu día a día.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {/* Izquierda: dos chicos apilados */}
              <div className="space-y-4">
                {resto.slice(0, 2).map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="flex gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      <Image
                        src={p.img}
                        alt={p.alt}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {p.title}
                      </h4>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Derecha: tarjeta grande (dos columnas) */}
              <Link
                href={destacado.href}
                className="md:col-span-2 rounded-xl border border-slate-100 overflow-hidden hover:bg-slate-50"
              >
                <div className="relative aspect-[4/3] bg-slate-50">
                  <Image
                    src={destacado.img}
                    alt={destacado.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 512px"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {destacado.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {destacado.excerpt}
                  </p>
                </div>
              </Link>
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

          {/* Newsletter */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
