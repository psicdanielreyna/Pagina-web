import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  title: string
  description: string
  href: string
  image: string
  price: number
  currency?: string
}

export default function ProductCard({
  title,
  description,
  href,
  image,
  price,
  currency = "MXN",
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link href={href}>
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            {price.toLocaleString("es-MX", {
              style: "currency",
              currency,
            })}
          </span>
          <Link
            href={href}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  )
}
