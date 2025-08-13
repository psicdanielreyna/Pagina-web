// app/tienda/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { recursos } from '@/data/recursos'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return recursos.map((r) => ({ slug: r.slug }))
}

export default function RecursoPage({ params }: Props) {
  const item = recursos.find((r) => r.slug === params.slug)
  if (!item) return notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <p className="text-gray-700 mt-2">{item.description}</p>

          <div className="text-2xl font-bold mt-4">
            MXN {item.price.toFixed(2)}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {item.mercadoPago ? (
              <a
                href={item.mercadoPago}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700"
              >
                Pagar con Mercado Pago
              </a>
            ) : (
              <button
                disabled
                className="rounded-lg bg-gray-300 px-5 py-3 text-gray-600 cursor-not-allowed"
                title="Próximamente"
              >
                Método de pago no disponible
              </button>
            )}

            <Link
              href="/descargar"
              className="rounded-lg border px-5 py-3 hover:bg-gray-50"
            >
              ¿Ya tienes PIN? Descarga aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
