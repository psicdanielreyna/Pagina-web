// components/UltimoBlog.tsx
import Link from "next/link";
import Image from "next/image";

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
    alt: "Portada Post 1",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Post 2",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Portada Post 2",
  },
  {
    slug: "apagar-mente",
    title: "Post 3",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Portada Post 3",
  },
];

export default function UltimoBlog() {
  const [destacado, ...resto] = posts;

  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Último del blog
            </h2>
            <p className="mt-1 text-slate-600">
              Lecturas breves y útiles para tu día a día.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline text-slate-700 hover:text-slate-900 border rounded-full px-3 py-1"
          >
            Ver blog
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* IZQUIERDA: destacado grande (ocupa 2 columnas en desktop) */}
          <Link
            href={destacado.href}
            className="md:col-span-2 rounded-2xl border border-slate-200 bg-white overflow-hidden hover:bg-slate-50 transition"
          >
            <div className="relative h-72 bg-slate-100">
              <Image
                src={destacado.img}
                alt={destacado.alt}
                fill
                className="object-contain"
                priority
                sizes="(min-width: 1024px) 800px, 100vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{destacado.title}</h3>
              <p className="mt-1 text-slate-600">{destacado.excerpt}</p>
            </div>
          </Link>

          {/* DERECHA: lista de 2 pequeños */}
          <div className="space-y-4">
            {resto.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 hover:bg-slate-50 transition"
              >
                <div className="relative h-14 w-14 shrink-0 rounded-lg bg-slate-100 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    className="object-contain"
                    sizes="56px"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}

            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Ver blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
