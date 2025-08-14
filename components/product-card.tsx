import Image from "next/image"
import Link from "next/link"

type Props = {
  slug: string
  title: string
  description: string
  image: string
  price: number
}

export default function ProductCard({ slug, title, description, image, price }: Props) {
  return (
    <Link
      href={`/tienda/${slug}`}
      className="rounded-xl border bg-white hover:shadow-md transition overflow-hidden"
    >
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-slate-600 text-sm mt-1 line-clamp-2">{description}</p>
        <p className="mt-2 font-medium">MXN {price}.00</p>
      </div>
    </Link>
  )
}
