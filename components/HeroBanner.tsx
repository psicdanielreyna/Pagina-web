// components/HeroBanner.tsx
import Image from "next/image";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string; // e.g. "/talleres-hero.jpg"
};

export default function HeroBanner({ badge, title, subtitle, imageUrl }: Props) {
  return (
    <section className="relative isolate">
      <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
        {/* Imagen de fondo optimizada */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
        )}

        {/* Overlay para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/35" />
      </div>

      {/* Contenido */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="-mt-24 pb-10 md:-mt-28 md:pb-12">
          {badge ? (
            <span className="inline-block rounded-full bg-white/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
              {badge}
            </span>
          ) : null}

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-neutral-900 md:text-5xl">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-3 max-w-3xl text-neutral-700">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}