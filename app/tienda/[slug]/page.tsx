// app/tienda/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";

type Producto = {
  slug: string;
  titulo: string;
  subtitulo: string;
  precio: string;
  img: string;
  alt: string;
  descripcionLarga: string;
  contenidos?: string[];
};

const CATALOGO: Producto[] = [
  {
    slug: "apagar-mente",
    titulo: "Cómo Apagar tu Mente",
    subtitulo: "Técnicas efectivas para calmar el sobrepensamiento.",
    precio: "$249 MXN",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    descripcionLarga:
      "Método paso a paso para identificar gatillos, regular la activación y salir del bucle rumiativo. Incluye ejercicios guiados y hoja de trabajo.",
    contenidos: [
      "Guía PDF (32 páginas)",
      "Plantilla de registro",
      "Ejercicios de respiración y anclaje",
    ],
  },
  {
    slug: "el-arte-de-creer-en-ti",
    titulo: "El Arte de Creer en Ti",
    subtitulo: "Estrategias para fortalecer tu autoestima y confianza.",
    precio: "$249 MXN",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    descripcionLarga:
      "Programa práctico para reentrenar tu diálogo interno, fortalecer límites y sostener hábitos de autocuidado sin frases mágicas.",
    contenidos: [
      "Guía PDF (28 páginas)",
      "Reto de 7 días",
      "Checklist de límites sanos",
    ],
  },
];

// Pre-render estático de los slugs existentes
export function generateStaticParams() {
  return CATALOGO.map((p) => ({ slug: p.slug }));
}

export default function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const producto = CATALOGO.find((p) => p.slug === params.slug);

  if (!producto) {
    // Si no existe, puedes mostrar 404 simple
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <p className="mt-2 text-slate-600">Revisa la URL o vuelve a la tienda.</p>
          <div className="mt-6">
            <Link
              href="/tienda"
              className="inline-flex items-center rounded-full border border-slate-300 px-5 py-3 hover:bg-slate-50"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div className="relative h-64 md:h-96 bg-slate-100">
            <Image
              src={producto.img}
              alt={producto.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{producto.titulo}</h1>
          <p className="mt-2 text-slate-600">{producto.subtitulo}</p>
          <p className="mt-4 text-slate-700">{producto.descripcionLarga}</p>

          {producto.contenidos?.length ? (
            <ul className="mt-4 list-disc list-inside text-slate-700">
              {producto.contenidos.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}

          <p className="mt-6 text-xl font-semibold text-slate-900">
            {producto.precio}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/checkout/${producto.slug}`} // ajusta a tu checkout real
              className="inline-flex items-center rounded-full bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700"
            >
              Comprar
            </Link>
            <Link
              href="/tienda"
              className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 hover:bg-slate-50"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
