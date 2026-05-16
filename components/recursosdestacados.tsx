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
            className="rounded-2xl overflow-hidden hover:shadow-sm transition-shadow"
            style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}
          >
            {/* Imagen */}
            <div
              className="relative h-52 flex items-center justify-center"
              style={{ background: "var(--accent-light)" }}
            >
              <Image
                src={recurso.imagen}
                alt={recurso.titulo}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <Link href={recurso.enlace}>
                <h3
                  className="font-medium text-base leading-snug hover:underline mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {recurso.titulo}
                </h3>
              </Link>
              <p
                className="text-sm leading-relaxed line-clamp-2 mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {recurso.descripcion}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-base font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  ${recurso.precio} {recurso.moneda}
                </span>
                <Link
                  href={recurso.enlace}
                  className="rounded-full text-xs px-4 py-2 transition-colors"
                  style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
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