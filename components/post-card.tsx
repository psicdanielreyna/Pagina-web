// /components/post-card.tsx
import Image from "next/image"
import Link from "next/link"

type Props = {
  href: string
  title: string
  excerpt: string
  image?: string
  featured?: boolean
}

export default function PostCard({
  href,
  title,
  excerpt,
  image = "/blog/placeholder.jpg",
  featured = false,
}: Props) {
  return (
    <Link
      href={href}
      className={
        featured
          ? "group block rounded-2xl overflow-hidden border hover:shadow-xl transition"
          : "group block rounded-xl overflow-hidden border hover:shadow-md transition"
      }
    >
      <div className={featured ? "relative aspect-[16/9]" : "relative aspect-[4/3]"}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes={featured ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 1024px) 450px, 100vw"}
          priority={featured}
        />
      </div>
      <div className={featured ? "p-6 space-y-2 bg-white" : "p-4 space-y-1 bg-white"}>
        <h3 className={featured ? "text-xl font-semibold" : "text-lg font-semibold"}>{title}</h3>
        <p className="text-sm text-neutral-600">{excerpt}</p>
        <span className="inline-block text-sm text-blue-600 mt-1">Leer más →</span>
      </div>
    </Link>
  )
}
