// components/product-card.tsx
import Link from "next/link"
import Image from "next/image"

type Props = {
  title: string
  description: string
  href: string
  image?: string
  price?: number
  currency?: "MXN"
}

export default function ProductCard({
  title,
  description,
  href,
  image,
  price,
  currency = "MXN",
}: Props) {
  return (
    <div className="border rounded-xl p-4 h-full flex flex-col">
      {image ? (
        <div className="relative w-full h-44 mb-3 overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
      ) : null}

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1 flex-1">{description}</p>

      <div className="mt-3 flex items-center justify-between">
        {typeof price === "number" ? (
          <span className="text-base font-medium">
            {currency === "MXN" ? "$" : ""}
            {price} {currency}
          </span>
        ) : <span />}

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}
