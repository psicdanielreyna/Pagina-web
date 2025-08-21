// app/page.tsx
import Image from "next/image";
import Link from "next/link";

// ====== DATA ======
type Recurso = {
  slug: "apagar-mente" | "el-arte-de-creer-en-ti";
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

const recursos: Recurso[] = [
  {
    slug: "apagar-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/tienda",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada del manual Cómo apagar tu mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/tienda",
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
    slug: "el-arte-de-creer-en-ti",
    title: "Post 1",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 1",
  },
  {
    slug: "apagar-mente",
    title: "Post 2",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 2",
  },
  {
    slug: "post-3",
    title: "Post 3",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    // si no existe, Next/Image mostrará un fondo gris (puedes añadir la imagen luego)
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 3",
  },
];

export default function HomePage() {
  const [destacado, ...resto] = posts;

  return (
    <div className="space-y-16">
      {/* ==== HERO (igual que ya tenías) ==== */}
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

      {/* ==== RECURSOS DESTACADOS (mismo tamaño que Tienda) ==== */}
      <section className="py-8 md:py-12">
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

          <div className="grid gap-6 md:grid-cols-2">
            {recursos.map((r) => (
              <Link
                href={r.href}
                key={r.slug}
                className="group block rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-56 md:h-64 w-full bg-slate-100">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900">{r.title}</h3>
                  <p className="mt-1 text-slate-600 text-sm">{r.excerpt}</p>
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

      {/* ==== BLOG (teaser: 1 grande + 2 pequeños a la derecha) ==== */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Último del blog
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Grande a la izquierda */}
            <Link
              href={destacado.href}
              className="lg:col-span-2 block rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-64 md:h-80 bg-slate-100">
                <Image
                  src={destacado.img}
                  alt={destacado.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-xl text-slate-900">
                  {destacado.title}
                </h3>
                <p className="mt-1 text-slate-600">{destacado.excerpt}</p>
              </div>
            </Link>

            {/* Dos pequeños a la derecha */}
            <div className="grid gap-6">
              {resto.slice(0, 2).map((p) => (
                <Link
                  href={p.href}
                  key={p.slug}
                  className="block rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative h-40 bg-slate-100">
                    <Image
                      src={p.img}
                      alt={p.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-slate-600 text-sm">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full px-4 py-2
                           border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Ver blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==== NEWSLETTER (debajo del blog) ==== */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Newsletter
            </h2>
            <p className="mt-1 text-slate-600">
              Consejos breves y herramientas que sí puedes aplicar.
            </p>

            <form
              className="mt-6 flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (
                  e.currentTarget.elements.namedItem(
                    "email"
                  ) as HTMLInputElement
                )?.value;
                if (email) {
                  window.location.href = `mailto:daniel@tu-dominio.com?subject=Suscripción%20newsletter&body=Quiero%20suscribirme.%20Mi%20correo:%20${encodeURIComponent(
                    email
                  )}`;
                }
              }}
            >
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="flex-1 rounded-full border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600/40"
              />
              <button
                type="submit"
                className="rounded-full bg-emerald-700 text-white px-5 py-3 font-medium hover:bg-emerald-800"
              >
                Quiero recibirlo
              </button>
            </form>

            <p className="mt-2 text-xs text-slate-500">
              *Cuando tengas tu backend listo, conectamos este formulario a tu
              endpoint real.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
