import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import recursosData, { Recurso } from "@/data/recursos"

type Props = { params: { slug: string } }

export default function TiendaItemPage({ params }: Props) {
  const item = recursosData.find(r => r.slug === params.slug) as Recurso | undefined
  if (!item) return notFound()

  return (
    <div className="container mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <p className="mt-3 text-gray-700">{item.description}</p>

          <div className="mt-4 text-xl font-medium">
            ${item.price} MXN
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {item.mercadoPago && (
              <a
                href={item.mercadoPago}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-[#00A650] text-white hover:opacity-90"
              >
                Comprar con Mercado Pago
              </a>
            )}

            <Link
              href={`/tienda/${item.slug}/codigo`}
              className="inline-flex items-center px-4 py-2 rounded-lg border"
            >
              Ya tengo código
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
