// components/HeroBanner.tsx
"use client";

import Image from "next/image";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string; // opcional: fondo
  className?: string;
};

export default function HeroBanner({ badge, title, subtitle, imageUrl, className }: Props) {
  return (
    <section
      className={`relative isolate overflow-hidden
                  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                  from-amber-50 via-rose-50 to-white ${className ?? ""}`}
    >
      {/* Fondo con imagen opcional */}
      {imageUrl ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center">
          {badge ? (
            <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-black/10 backdrop-blur">
              {badge}
            </span>
          ) : null}

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-900">
            {title}
          </h1>

          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 sm:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}