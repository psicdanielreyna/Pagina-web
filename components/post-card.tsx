// components/post-card.tsx
import Image from "next/image"
import Link from "next/link"

type Props = {
  slug: string
  title: string
  excerpt: string
  image: string
  date?: string
}

export default function PostCard({ slug, title, excerpt, image, date }: Props) {
  return (
    <article className="border rounded-xl overflow-hidden hover:shadow-md transition h-full flex flex-col">
      <div className="relative aspect-[16/10] bg-neutral-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          priority={false}
        />
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        {date && (
          <span className="text-xs text-neutral-500">
            {new Date(date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}

        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <p className="text-neutral-600 text-sm flex-1">{excerpt}</p>

        <div className="pt-2">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  )
}
