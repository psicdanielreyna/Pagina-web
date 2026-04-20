import Image from "next/image";
import Link from "next/link";
import { recursosDestacados, type Recurso } from "@/lib/recursosDestacados";

export default function RecursosDestacados() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid gap-4 md:grid-cols-2">
        {recursosDestacados.map((recurso: Recurso, index: number) => (
          <article
            key={index}
            className="rounded-2xl border border-black/8 bg-white hover:shadow-sm transition-shadow flex gap-4 p-4 items-start"
          >
            <div className="relative h-16 w-12 shrink-0 bg-emerald-50 rounded-lg overflow-hidden">
              <Image
                src={recurso.imagen}
                alt={recurso.titulo}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link href={recurso.enlace}>
                <h3 className="font-medium text-zinc-900 text-sm leading-snug hover:underline">
                  {recurso.titulo}
                </h3>
              </Link>
              <p className="mt-1 text-xs text-zinc-500 line-clamp-2">{recurso.descripcion}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-900">
                  ${recurso.precio} {recurso.moneda}
                </span>
                <Link
                  href={recurso.enlace}
                  className="text-xs text-emerald-700 hover:underline font-medium"
                >
                  Ver recurso →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}