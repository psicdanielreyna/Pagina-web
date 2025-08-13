import Image from "next/image"
import Link from "next/link"

type ProductCardProps = {
  title: string
  description: string
  href: string
  image?: string
  price?: number
  currency?: "MXN" | "USD"
}

export default function ProductCard({
  title,
  description,
  href,
  image = "/placeholder.svg",
  price,
  currency = "MXN",
}: ProductCardProps) {
  return (
    <article className="rounded-2xl border bg-white hover:shadow-md transition">
      <Link href={href} className="block">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-50">
          <Image
            src={image}
            alt={title}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{description}</p>
          {typeof price === "number" && (
            <p className="mt-3 font-semibold">
              {currency} {price}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

