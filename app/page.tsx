// …mantén tus imports y el hero tal como los tienes arriba
import Image from "next/image";
import Link from "next/link";

type Card = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

// === Recursos (solo 2 manuales) ===
const destacados: Card[] = [
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

// === Blog (3 posts de ejemplo) ===
const homePosts: Card[] = [
  {
    title: "Post 1",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 1",
  },
  {
    title: "Post 2",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 2",
  },
  {
    title: "Post 3",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 3",
  },
];

export default function HomePageSections() {
  return (
    <>
      {/* === RECURSOS DESTACADOS (estilo tienda) === */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Recursos destacados
            </h2>
            <Link href="/tienda" className="text-emerald-700 hover:text-emerald-800 font-medium">
              Ver todos
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {destacados.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition"
              >
                {/* Alto y “grosor” iguales a tienda */}
                <div className="relative h-[260px] md:h-[300px] bg-slate-50">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    className="object-contain"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm">{p.excerpt}</p>

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

      {/* === BLOG + NEWSLETTER === */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start">
          {/* Blog teaser con 1 grande + 2 chicos */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Último del blog</h2>
            <p className="mt-1 text-slate-600">Lecturas breves y útiles para tu día a día.</p>

            <div className="mt-6 grid lg:grid-cols-3 gap-4">
              {/* Grande a la izquierda (col-span-2) */}
              <Link
                href={homePosts[0].href}
                className="lg:col-span-2 rounded-xl border border-slate-100 overflow-hidden hover:bg-slate-50 transition"
              >
                <div className="relative h-56 md:h-64 bg-slate-100">
                  <Image
                    src={homePosts[0].img}
                    alt={homePosts[0].alt}
                    fill
                    className="object-contain"
                    sizes="(min-width:1024px) 66vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{homePosts[0].title}</h3>
                  <p className="text-sm text-slate-600">{homePosts[0].excerpt}</p>
                </div>
              </Link>

              {/* Dos pequeños a la derecha */}
              {homePosts.slice(1).map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="rounded-xl border border-slate-100 overflow-hidden hover:bg-slate-50 transition"
                >
                  <div className="relative h-28 bg-slate-100">
                    <Image src={p.img} alt={p.alt} fill className="object-contain" sizes="33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{p.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
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

          {/* Newsletter (tu componente) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            {/* <Newsletter />  // deja aquí tu componente si lo tienes */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Newsletter</h2>
            <p className="mt-1 text-slate-600">
              Consejos breves y herramientas que sí puedes aplicar.
            </p>
            {/* Placeholder de formulario simple */}
            <form className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 outline-none"
              />
              <button
                type="button"
                className="rounded-full bg-emerald-700 px-5 py-2 text-white hover:bg-emerald-800"
              >
                Quiero recibirlo
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-2">
              *Cuando tengas tu backend listo, conectamos este formulario a tu endpoint real.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
