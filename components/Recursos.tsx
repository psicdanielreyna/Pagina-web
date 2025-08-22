// components/Recursos.tsx
import Link from "next/link";
import Image from "next/image";

type Recurso = {
  slug: string;
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
]; // 👈 IMPORTANTE: cerrar el array con '];'

export default function Recursos() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        {/* Título + Ver todos */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Recursos destacados
          </h2>
          <Link
            href="/tienda"
            className="text-emerald-700 hover:text-emerald-800 font-medium"
          >
            Ver todos
          </Link>
        </div>

        {/* Cards compactas */}
        <div className="flex flex-wrap gap-6">
          {recursos.map((r) => (
            <Link
              key={r.slug}
              href={r.href}
              className="group block rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition
                         w-full sm:w-[330px] md:w-[350px] lg:w-[370px] max-w-[370px]"
            >
              {/* Portada: se muestra completa */}
              <div className="relative w-full h-48 bg-slate-100 rounded-t-2xl overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.alt}
                  fill
                  className="object-contain"
                  sizes="(min-width:1024px) 370px, (min-width:768px) 350px, 100vw"
                  priority
                />
              </div>

              {/* Texto */}
              <div className="p-5">
                <h3 className="font-semibold text-base">{r.title}</h3>
                <p className="mt-1 text-slate-600 text-sm">{r.excerpt}</p>
                <span className="mt-3 inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white group-hover:bg-slate-100">
                  Leer más
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
