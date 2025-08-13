// components/product-card.tsx
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  description: string
  href: string
  image: string
  price?: number
  currency?: 'MXN'
}

export default function ProductCard({
  title,
  description,
  href,
  image,
  price,
  currency = 'MXN'
}: Props) {
  return (
    <article className="rounded-2xl border bg-white/50 shadow-sm overflow-hidden">
      <Link href={href} className="block">
        <div className="aspect-[16/10] relative bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        {typeof price === 'number' && (
          <div className="mt-3 text-base font-semibold">
            {currency} {price.toFixed(2)}
          </div>
        )}

        <div className="mt-3">
          <Link
            href={href}
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Ver más
          </Link>
        </div>
      </div>
    </article>
  )
}
