"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-[#F6E9D9] py-16">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-12 px-6 md:flex-row md:gap-8">
        {/* Texto */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-900 sm:text-5xl">
            Psicología clara y práctica
          </h1>
          <p className="mt-4 text-lg text-emerald-800">
            Pequeños cambios que transforman tu bienestar.
          </p>
          <p className="mt-2 text-gray-700">
            Herramientas simples que puedes aplicar en tu día a día.
          </p>

          {/* Botones */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="/agenda"
              className="rounded-md bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-emerald-800"
            >
              Agenda una cita
            </a>
            <a
              href="/tienda"
              className="rounded-md border border-emerald-900 px-5 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
            >
              Ver recursos
            </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative w-full max-w-md md:w-1/2">
          <Image
            src="/hero.png" // 👈 coloca tu imagen en /public/
            alt="Sesión de terapia"
            width={480}
            height={320}
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      </div>
    </section>
  );
}
