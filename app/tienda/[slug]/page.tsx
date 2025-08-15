// app/tienda/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import recursos from "@/data/recursos"

type Props = { params: { slug: string } }

export default function TiendaItemPage({ params }: Props) {
  const item = recursos.find(r => r.slug === params.slug)
  if (!item) return notFound()

  // Fallback para la imagen (evita string | undefined)
  // 1) usa la ruta declarada en el recurso
  // 2) si no hay, intenta /manuales/<slug>.png
  // 3) si tampoco existe, usa una genérica
    const imgSrc = item.image ?? `/manuales/${item.slug}.png`;
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Portada grande, completa */}
        <div className="relative aspect-[4/5] rounded-2xl border bg-white overflow-hidden">
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            className="object-contain"   // asegura que se vea completa
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>

        {/* Detalle */}
        <div>
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          {item.description && (
            <p className="text-neutral-700 mt-3">{item.description}</p>
          )}

          {item.price && (
            <p className="mt-6 text-2xl font-semibold">
              ${item.price} MXN
            </p>
          )}

          <div className="flex gap-3 mt-6">
            {/* Si hay link de Mercado Pago, lo usamos */}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Comprar (Mercado Pago)
              </a>
            ) : (
              // Si no hay href, oculta o cambia por otra acción
              <button
                disabled
                className="inline-flex items-center rounded-full px-5 py-2.5 bg-gray-200 text-gray-600 cursor-not-allowed"
              >
                Próximamente
              </button>
            )}

            <Link
              href="/tienda"
              className="inline-flex items-center rounded-full px-5 py-2.5 border hover:bg-neutral-50 transition"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
