// app/tienda/page.tsx
import Image from "next/image";
import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  price: string;
  img: string;
  alt: string;
  blurb: string;
  mpLink: string; // Mercado Pago
};

const items: Item[] = [
  {
    slug: "apagar-mente",
    title: "Cómo Apagar tu Mente",
    price: "$249 MXN",
    img: "/images/tienda/apagar-mente.png",
    alt: "Portada Cómo Apagar tu Mente",
    blurb: "Técnicas efectivas para calmar el sobrepensamiento.",
    mpLink: "https://mpago.la/1UDDJxC", // 🔁 reemplaza por tu link real
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: "$249 MXN",
    img: "/images/tienda/el-arte-de-creer-en-ti.png",
    alt: "Portada El Arte de Creer en Ti",
    blurb: "Estrategias para fortalecer tu autoestima y confianza.",
    mpLink: "https://mpago.la/1LrHK3P", // 🔁 reemplaza por tu link real
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

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <div
              key={it.slug}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              {/* Imagen con misma altura que “Recursos” y portada completa */}
              <div className="relative h-[260px] md:h-[300px] bg-slate-50">
                <Image src={it.img} alt={it.alt} fill className="object-contain" />
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-semibold text-slate-900">{it.title}</h3>
                <p className="text-slate-600 text-sm">{it.blurb}</p>
                <p className="font-semibold">{it.price}</p>

                <div className="flex gap-3 pt-2">
                  <a
                    href={it.mpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Comprar
                  </a>

                  <Link
                    href={`/tienda/${it.slug}`}
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-slate-700 hover:bg-slate-50"
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
