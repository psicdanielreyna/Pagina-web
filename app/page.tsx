// app/page.tsx
import Link from "next/link";
import Image from "next/image";

type Card = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

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
                           text-white font-medium bg-teal-700 shadow-md transition
                           hover:bg-teal-800 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700/60
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

      {/* RECURSOS DESTACADOS */}
      <section className="pb-4">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Recursos destacados
            </h2>
            <Link
              href="/blog"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Ver todos
            </Link>
          </div>

          {/* Carrusel móvil (snap) + grid desktop */}
          <div className="md:grid md:grid-cols-3 md:gap-6 flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {destacados.map((item) => (
              <article
                key={item.href}
                className="md:w-auto w-72 shrink-0 snap-start rounded-2xl border border-slate-200 bg-white overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.excerpt}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center justify-center rounded-full px-4 py-2
                               border border-slate-300 text-slate-700 text-sm transition
                               hover:bg-slate-50 focus-visible:outline-none
                               focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
                  >
                    Leer más
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
