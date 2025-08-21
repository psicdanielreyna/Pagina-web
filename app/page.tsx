// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

// Usa las MISMAS imágenes que en /tienda para asegurar que carguen.
// Si tus archivos se llaman distinto, solo cambia los src de cada item.
const manuales = [
  {
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    // ⬇️ AJUSTA estas rutas para que apunten a los mismos archivos de Tienda
    img: "/images/tienda/como-apagar-tu-mente.webp",
    alt: "Portada del manual Cómo apagar tu mente",
  },
  {
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    // ⬇️ AJUSTA estas rutas para que apunten a los mismos archivos de Tienda
    img: "/images/tienda/el-arte-de-creer-en-ti.webp",
    alt: "Portada del manual El arte de creer en ti",
  },
];

// Posts para el teaser del home (no cambia URLs reales, solo el título visible)
const teaserPosts = [
  {
    title: "Post 1",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.webp",
    alt: "Post 1",
  },
  {
    title: "Post 2",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-en-3-pasos.webp",
    alt: "Post 2",
  },
];

export default function HomePage() {
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

      {/* RECURSOS DESTACADOS (mismo tamaño que Tienda) */}
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

          <div className="grid md:grid-cols-2 gap-6">
            {manuales.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                {/* Alto parecido al de Tienda: image-top */}
                <div className="relative h-64 w-full bg-slate-100">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm">{m.excerpt}</p>

                  <div className="mt-4">
                    {/* Ahora va a TIENDA */}
                    <Link
                      href="/tienda"
                      className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Leer más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG + NEWSLETTER (blog grande a la izq, 2 chicos a la derecha) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          {/* Columna Blog */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Último del blog
            </h2>
            <p className="text-slate-600 mb-6">
              Lecturas breves y útiles para tu día a día.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Post grande (el primero) */}
              <Link
                href={teaserPosts[0].href}
                className="md:col-span-2 rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-64 w-full bg-slate-100">
                  <Image
                    src={teaserPosts[0].img}
                    alt={teaserPosts[0].alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 80vw, 100vw"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {teaserPosts[0].title}
                  </h3>
                  <p className="mt-1 text-slate-600 text-sm">
                    {teaserPosts[0].excerpt}
                  </p>
                </div>
              </Link>

              {/* Post chico (el segundo) */}
              <Link
                href={teaserPosts[1].href}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-44 w-full bg-slate-100">
                  <Image
                    src={teaserPosts[1].img}
                    alt={teaserPosts[1].alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {teaserPosts[1].title}
                  </h3>
                  <p className="mt-1 text-slate-600 text-sm">
                    {teaserPosts[1].excerpt}
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

          {/* Newsletter debajo del blog en mobile (columna 2 en desktop) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
