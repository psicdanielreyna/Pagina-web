// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

// ===== Tipos =====
type Recurso = {
  slug: string;
  title: string;
  excerpt: string;
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

// ===== Data (ajústalo cuando tengas más items) =====
const recursos: Recurso[] = [
  {
    slug: "apagar-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada del manual Cómo apagar tu mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
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
    excerpt: "Un mini-protocolo para reconocer, regular y responder mejor.",
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
          {/* Texto */}
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

          {/* Imagen hero */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
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

      {/* ===== RECURSOS (más pequeños, portadas completas) ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Recursos destacados
            </h2>

            {/* Ver todos -> TIENDA */}
            <Link
              href="/tienda"
              className="text-emerald-700 hover:text-emerald-800 font-medium"
            >
              Ver todos
            </Link>
          </div>

          {/* Cards más compactas que la tienda */}
          <div className="grid md:grid-cols-2 gap-6">
            {recursos.map((r) => (
              <Link
                key={r.slug}
                href={`/tienda/${r.slug}`}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                {/* Contenedor de imagen compacto, portada completa */}
                <div className="relative h-56 md:h-60 bg-slate-50">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    fill
                    className="object-contain p-6"
                    sizes="(min-width: 768px) 50vw, 100vw"
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

      {/* ===== BLOG (estilo “post grande + miniaturas”) ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Último del blog
          </h2>
          <p className="mt-1 text-slate-600">
            Lecturas breves y útiles para tu día a día.
          </p>

          <div className="mt-6 grid lg:grid-cols-[1fr,380px] gap-6">
            {/* Post grande a la izquierda */}
            <Link
              href={destacado.href}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-80 md:h-96 bg-slate-50">
                <Image
                  src={destacado.img}
                  alt={destacado.alt}
                  fill
                  className="object-contain p-6"
                  sizes="(min-width:1024px) 60vw, 100vw"
                  priority
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">{destacado.title}</h3>
                <p className="mt-1 text-slate-600">
                  {destacado.excerpt}
                </p>
              </div>
            </Link>

            {/* Resto pequeños a la derecha */}
            <div className="space-y-4">
              {resto.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3 hover:bg-slate-50 transition"
                >
                  <div className="relative w-16 h-20 shrink-0 rounded-md overflow-hidden bg-slate-50">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      className="object-contain p-1.5"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Ver blog
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter debajo del bloque de blog */}
          <div className="mt-8">
            <div className="rounded-2xl border border-slate-100 bg-white p-6">
              <Newsletter />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
