import Image from "next/image";
import Link from "next/link";
import { recursosDestacados } from "@/lib/recursosDestacados";

type Recurso = {
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  imagen: string;
  enlace: string;
};

export default function RecursosDestacados() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {recursosDestacados.map((recurso: Recurso, index: number) => (
          <article
            key={index}
            className="rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Contenedor con relación y object-contain para ver la portada completa */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-[#F6F0E6]">
              <Image
                src={recurso.imagen}
                alt={recurso.titulo}
                fill
                className="object-contain p-3"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={index === 0}
              />
            </div>

            <div className="p-4">
              <h3 className="text-base font-semibold leading-snug text-emerald-900">
                {recurso.titulo}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                {recurso.descripcion}
              </p>

              <p className="mt-3 text-sm font-medium text-emerald-800">
                ${recurso.precio} {recurso.moneda}
              </p>

              <Link
                href={recurso.enlace}
                target="_blank"
                className="mt-3 inline-block rounded-md bg-emerald-700 px-3 py-1.5 text-sm text-white hover:bg-emerald-800"
              >
                Ver recurso
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}