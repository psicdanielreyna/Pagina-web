// components/recursosdestacados.tsx
import Image from "next/image";
import Link from "next/link";
import { recursosDestacados, type Recurso } from "@/lib/recursosDestacados";

export default function RecursosDestacados() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid gap-6 md:grid-cols-2">
        {recursosDestacados.map((recurso: Recurso, index: number) => (
          <article
            key={index}
            className="rounded-xl border border-emerald-900/10 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={recurso.enlace} className="block">
              <div className="relative h-72 w-full overflow-hidden rounded-t-xl bg-emerald-900/5">
                <Image
                  src={recurso.imagen}
                  alt={recurso.titulo}
                  fill
                  className="object-contain p-8"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </Link>

            <div className="p-5">
              <Link href={recurso.enlace} className="block">
                <h3 className="font-semibold text-emerald-900 hover:underline">
                  {recurso.titulo}
                </h3>
              </Link>

              <p className="mt-2 text-sm text-emerald-900/80">{recurso.descripcion}</p>

              <div className="mt-3 text-sm font-semibold text-emerald-900">
                ${recurso.precio} {recurso.moneda}
              </div>

              <div className="mt-4">
                <Link
                  href={recurso.enlace}
                  className="inline-flex items-center rounded-md bg-emerald-700 px-3 py-2 text-white hover:bg-emerald-800"
                >
                  Ver recurso
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}