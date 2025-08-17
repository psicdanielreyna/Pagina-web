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

// ---------- DATA ----------
const destacados: Card[] = [
  {
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/post-1.png",
    alt: "Cómo apagar tu mente",
  },
  {
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/post-2.png",
    alt: "El arte de creer en ti",
  },
];

const postsBlog: Card[] = [
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

// ---------- PAGE ----------
export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
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

          {/* Imagen */}
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

      {/* RECURSOS DESTACADOS (2) */}
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

          <div className="grid md:grid-cols-2 gap-6">
            {destacados.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
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

      {/* BLOG (grande) */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Último del blog
          </h2>
          <p className="text-slate-600 mb-6">
            Lecturas breves y útiles para tu día a día.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {postsBlog.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image src={p.img} alt={p.alt} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{p.excerpt}</p>
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
      </section>

      {/* NEWSLETTER (debajo del blog) */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  );
}
