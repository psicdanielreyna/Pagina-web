import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({
  title,
  description,
  href,
  image,
  price,
  currency = 'MXN',
}: {
  title: string
  description: string
  href: string
  image?: string
  price?: number
  currency?: 'MXN'
}) {
  return (
    <Link href={href} className="block border rounded-2xl overflow-hidden bg-card hover:shadow-sm transition-shadow">
      <div className="relative aspect-video w-full bg-muted">
        {image ? (
          <Image
            src={image}
            alt={`Portada ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 text-sm">
          {typeof price === 'number' ? `${currency} ${price}` : `${currency} —`}
        </div>
      </div>
    </Link>
  )
}
