// app/tienda/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const DB = {
  "apagar-mente": {
    title: "Cómo Apagar tu Mente",
    price: "$249 MXN",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    mpLink: "https://mpago.la/XXXXXXXX", // 🔁 reemplaza
    bullets: [
      "Guía PDF (32 páginas)",
      "Plantilla de registro",
      "Ejercicios de respiración y anclaje",
    ],
    intro:
      "Método paso a paso para identificar gatillos, regular la activación y salir del bucle rumiativo. Incluye ejercicios guiados y hoja de trabajo.",
  },
  "el-arte-de-creer-en-ti": {
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    mpLink: "https://mpago.la/YYYYYYYY", // 🔁 reemplaza
    bullets: [
      "Guía PDF (28 páginas)",
      "Ejercicios de autoobservación",
      "Plan semanal de hábitos",
    ],
    intro:
      "Herramientas prácticas para fortalecer tu autoconfianza sin frases mágicas ni humo. Diseñado para aplicar en tu día a día.",
  },
} as const;

type Slug = keyof typeof DB;

export default function ItemDetail({ params }: { params: { slug: Slug } }) {
  const data = DB[params.slug];
  if (!data) return notFound();

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        {/* Portada completa (contain) y altura generosa */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
          <div className="relative h-[420px] md:h-[560px]">
            <Image src={data.img} alt={data.alt} fill className="object-contain" priority />
          </div>
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {data.title}
          </h1>
          <p className="mt-2 text-lg text-slate-700">{data.intro}</p>

          <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1">
            {data.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <p className="mt-6 text-xl font-semibold">{data.price}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={data.mpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
            >
              Comprar
            </a>
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-slate-700 hover:bg-slate-50"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
