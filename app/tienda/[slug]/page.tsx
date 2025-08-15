// app/tienda/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import recursos from "@/data/recursos"

type Props = { params: { slug: string } }

export default function RecursoPage({ params }: Props) {
  const item = recursos.find((r) => r.slug === params.slug)
  if (!item) return notFound()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* PORTADA: sin recorte */}
        <div>
          <div className="relative aspect-[4/5] rounded-2xl border bg-white overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              // 🔹 muestra la imagen completa dentro del cuadro
              className="object-contain p-4"
              sizes="(min-width: 768px) 600px, 100vw"
              priority
            />
          </div>
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-4xl font-bold">{item.title}</h1>
          <p className="text-neutral-700 mt-3">{item.description}</p>

          <p className="text-2xl font-semibold mt-6">${item.price} MXN</p>

          <div className="flex flex-wrap gap-3 mt-6">
            {item.mercadoPago && (
              <a
                href={item.mercadoPago}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Pagar con Mercado Pago
              </a>
            )}

            <Link
              href={`/descargar?slug=${item.slug}`}
              className="inline-flex items-center rounded-full px-4 py-2 border hover:bg-neutral-50 transition"
            >
              Ya tengo código
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
