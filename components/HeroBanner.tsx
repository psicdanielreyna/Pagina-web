import Image from "next/image";

interface HeroBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export default function HeroBanner({ badge, title, subtitle, imageUrl }: HeroBannerProps) {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center">
      {/* Imagen de fondo */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Texto centrado */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <span className="inline-block mb-3 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-gray-800 shadow">
          {badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}