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
            className="rounded-2xl border border-black/8 bg-white hover:shadow-sm transition-shadow overflow-hidden"
          >
            {/* Imagen grande arriba */}
            <div className="relative h-52 bg-emerald-50 flex items-center justify-center">
              <Image
                src={recurso.imagen}
                alt={recurso.titulo}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Info abajo */}
            <div className="p-5">
              <Link href={recurso.enlace}>
                <h3 className="font-medium text-zinc-900 text-base leading-snug hover:underline mb-1">
                  {recurso.titulo}
                </h3>
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">
                {recurso.descripcion}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-zinc-900">
                  ${recurso.precio} {recurso.moneda}
                </span>
                <Link
                  href={recurso.enlace}
                  className="rounded-full bg-zinc-900 text-white text-xs px-4 py-2 hover:bg-zinc-700 transition-colors"
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