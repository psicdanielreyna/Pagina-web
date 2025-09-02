// components/ResourceCard.tsx
import Link from "next/link";
import Image from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export default function ResourceCard({
  title,
  description,
  href,
  image,
}: ResourceCardProps) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden border bg-white hover:shadow-lg transition">
      {image && (
        <div className="relative w-full h-40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Link
          href={href}
          className="inline-block px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Ver recurso
        </Link>
      </div>
    </div>
  );
}