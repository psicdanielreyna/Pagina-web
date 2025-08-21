// app/tienda/page.tsx
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
};

const productos: Producto[] = [
  {
    slug: "apagar-mente",
    titulo: "Cómo Apagar tu Mente",
    subtitulo: "Técnicas efectivas para calmar el sobrepensamiento.",
    precio: "$249 MXN",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    descripcionLarga:
      "Incluye ejercicios guiados, plantilla de registro y un método paso a paso para desactivar el bucle de pensamientos.",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    titulo: "El Arte de Creer en Ti",
    subtitulo: "Estrategias para fortalecer tu autoestima y confianza.",
    precio: "$249 MXN",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    descripcionLarga:
      "Herramientas prácticas para re-entrenar tu diálogo interno, cultivar límites sanos y sostener el cambio.",
  },
];

export default function TiendaPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Tienda</h1>
          <p className="mt-2 text-slate-600">
            Recursos descargables para que avances a tu ritmo.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {productos.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-48 md:h-56 bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              </div>

              <div className="flex-1 p-5">
                <h3 className="text-lg font-semibold text-slate-900">{p.titulo}</h3>
                <p className="mt-1 text-slate-600">{p.subtitulo}</p>
                <p className="mt-3 text-sm text-slate-600">{p.descripcionLarga}</p>
                <p className="mt-4 font-semibold text-slate-900">{p.precio}</p>
              </div>

              <div className="p-5 pt-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/tienda/${p.slug}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50"
                >
                  Ver más
                </Link>
                <Link
                  href={`/checkout/${p.slug}`} // ajusta cuando tengas checkout real
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-blue-600 text-white px-5 py-3 font-medium hover:bg-blue-700"
                >
                  Comprar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
