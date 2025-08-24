// app/tienda/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Producto = {
  slug: string;
  title: string;
  price: string;
  bullets: string[];
  img: string;
  alt: string;
  mpUrl: string; // Mercado Pago
};

const catalogo: Record<string, Producto> = {
  "apagar-mente": {
    slug: "apagar-mente",
    title: "Cómo Apagar tu Mente",
    price: "$249 MXN",
    bullets: [
      "Guía PDF (32 páginas)",
      "Plantilla de registro",
      "Ejercicios de respiración y anclaje",
    ],
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    mpUrl: "https://mpago.la/2AhKTob",
  },
  "el-arte-de-creer-en-ti": {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    bullets: [
      "Plan de 7 días con ejercicios breves",
      "Checklist para hábitos de autoconfianza",
      "Plantillas imprimibles",
    ],
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    mpUrl: "https://mpago.la/1f528P7",
  },
};

export default function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = catalogo[params.slug];
  if (!data) return notFound();

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
        {/* Portada completa */}
        <div className="rounded-2xl border border-slate-100 overflow-hidden">
          <div className="relative aspect-[4/3] bg-slate-50">
            <Image
              src={data.img}
              alt={data.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 640px"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {data.title}
          </h1>
          <p className="mt-2 text-slate-600">
            Técnicas efectivas y prácticas para que avances a tu ritmo.
          </p>

          <ul className="mt-6 space-y-2 text-slate-700">
            {data.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-semibold text-slate-900">{data.price}</p>

          <div className="mt-4 flex gap-3">
            <Link
              href={data.mpUrl}
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
            >
              Comprar
            </Link>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
