// components/product-card.tsx
import Image from "next/image"
import Link from "next/link"

type Props = {
  title: string
  description?: string
  image?: string
  price?: string | number
  href: string               // puede ser el slug interno o el link de Mercado Pago
  currency?: string
}

export default function ProductCard({
  title,
  description,
  image,
  price,
  href,
  currency = "MXN",
}: Props) {
  const isExternal = href.startsWith("http")

  const CardContent = (
    <>
      {image ? (
        <div className="relative w-full h-44 mb-3 overflow-hidden rounded-lg bg-gray-50">
          {/* Si usas imágenes en /public, pasa rutas absolutas desde la raíz: /manuales/xxx.png */}
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}

      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? (
        <p className="text-sm text-neutral-600 mt-1 line-clamp-3">{description}</p>
      ) : null}

      {price ? (
        <p className="mt-3 font-semibold">{typeof price === "number" ? `$${price} ${currency}` : price}</p>
      ) : null}
    </>
  )

  return (
    <div className="border rounded-xl p-4 h-full flex flex-col">
      <div className="flex-1">{CardContent}</div>

      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Comprar
        </a>
      ) : (
        <Link
          href={href}
          className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Ver detalle
        </Link>
      )}
    </div>
  )
}
