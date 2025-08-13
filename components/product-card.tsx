// components/product-card.tsx
import Image from "next/image"
import Link from "next/link"

type Props = {
  title: string
  description: string
  href: string
  image?: string
  price?: number
  currency?: "MXN"
}

export function ProductCard({
  title,
  description,
  href,
  image,
  price,
  currency = "MXN",
}: Props) {
  return (
    <article className="rounded-xl border overflow-hidden bg-white hover:shadow-sm transition">
      {image ? (
        <Link href={href} className="block aspect-[16/10] relative">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </Link>
      ) : null}

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>

        {typeof price === "number" ? (
          <div className="pt-1 font-semibold">
            {currency} {price.toFixed(2).replace(".00", "")}
          </div>
        ) : null}

        <div className="pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-95"
          >
            Ver más
          </Link>
        </div>
      </div>
    </article>
  )
}
