// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-almond">
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Texto */}
          <div>
            <h1 className="text-evergreen font-extrabold tracking-tight leading-tight text-4xl md:text-6xl">
              <span className="block">Psicología clara y práctica</span>
              <span className="block mt-3 text-evergreen/90 text-[clamp(22px,2.2vw,28px)] font-semibold">
                Pequeños cambios que transforman tu bienestar.
              </span>
            </h1>

            <p className="mt-5 text-evergreen/70 text-lg">
              Herramientas simples que puedes aplicar en tu día a día.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/agenda"
                className="inline-flex items-center justify-center rounded-lg bg-evergreen px-5 py-3 text-white hover:opacity-90 transition"
              >
                Agenda una cita
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border border-evergreen/30 px-5 py-3 text-evergreen hover:bg-evergreen/5 transition"
              >
                Ver recursos
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="order-first md:order-none">
            <div className="rounded-xl overflow-hidden ring-1 ring-black/5 shadow-md">
              <Image
                src="/hero.jpg"           // cambia por tu imagen
                alt="Sesión de terapia"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
