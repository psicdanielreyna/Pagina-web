// app/tienda/page.tsx
import Image from "next/image";
import Link from "next/link";

type Producto = {
  slug: string;        // slug para /tienda/<slug>
  manualSlug: string;  // slug real del manual para /checkout/<manualSlug>
  title: string;
  price: string;
  short: string;
  long: string;
  img: string;
  alt: string;
};

const productos: Producto[] = [
  {
    slug: "apagar-mente",
    manualSlug: "como-apagar-la-mente",
    title: "Cómo Apagar tu Mente",
    price: "$249 MXN",
    short: "Técnicas efectivas para calmar el sobrepensamiento.",
    long:
      "Método paso a paso para identificar gatillos, regular la activación y salir del bucle rumiativo.",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    manualSlug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    short: "Estrategias para fortalecer tu autoestima y confianza.",
    long:
      "Pequeños cambios diarios, ejercicios prácticos y plantillas para consolidar tu autoconfianza.",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
  },
];

export default function TiendaPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Tienda
          </h1>
          <p className="mt-2 text-slate-600">
            Recursos descargables para que avances a tu ritmo.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {productos.map((p) => (
            <div
              key={p.slug}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-slate-50">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
              </div>

              <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  {p.title}
                </h2>
                <p className="text-sm text-slate-600">{p.short}</p>
                <p className="text-sm text-slate-500">{p.long}</p>
                <p className="mt-2 font-semibold text-slate-900">{p.price}</p>

                <div className="mt-3 flex gap-3">
                  <Link
                    href={`/checkout/${p.manualSlug}`}
                    className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Comprar
                  </Link>
                  <Link
                    href={`/tienda/${p.slug}`}
                    className="inline-flex items-center justify-center rounded-full px-5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}