// components/Recursos.tsx
import Link from "next/link";
import Image from "next/image";

type Recurso = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  alt: string;
  href: string;
};

const recursos: Recurso[] = [
  {
    slug: "apagar-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo apagar tu mente",
    href: "/tienda/apagar-mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El arte de creer en ti",
    href: "/tienda/el-arte-de-creer-en-ti",
  },
];

export default function Recursos() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
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

       // components/Recursos.tsx (solo lo relevante)
<div className="flex flex-wrap gap-6">
  {recursos.map((r) => (
    <Link
      key={r.slug}
      href={r.href}
      className="group block rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition
                 w-full sm:w-[340px] md:w-[360px] lg:w-[380px] max-w-[380px]"
    >
      <div className="relative w-full h-48 bg-slate-100 rounded-t-2xl overflow-hidden">
        <Image
          src={r.img}
          alt={r.alt}
          fill
          className="object-contain"
          sizes="(min-width:1024px) 380px, (min-width:768px) 360px, 100vw"
          priority
        />
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-base">{r.title}</h3>
        <p className="mt-1 text-slate-600 text-sm">{r.excerpt}</p>
        <button
          type="button"
          className="mt-3 inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white hover:bg-slate-100"
        >
          Leer más
        </button>
      </div>
    </Link>
  ))}
</div>
