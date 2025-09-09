"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#F6E9D9]">
      <div className="container mx-auto flex flex-col-reverse items-center gap-8 px-4 py-16 md:flex-row md:gap-12">
        {/* Texto */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#043222] md:text-5xl">
            Psicología clara y práctica
          </h1>
          <p className="mt-4 text-lg font-medium text-[#043222]">
            Pequeños cambios que transforman tu bienestar.
          </p>
          <p className="mt-2 text-base text-gray-700">
            Herramientas simples que puedes aplicar en tu día a día.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-start">
            <Link
              href="/agenda"
              className="rounded-md bg-[#043222] px-6 py-3 text-white shadow hover:bg-[#065c3b] transition"
            >
              Agenda una cita
            </Link>
            <Link
              href="/tienda"
              className="rounded-md border border-[#043222] px-6 py-3 text-[#043222] hover:bg-[#043222] hover:text-white transition"
            >
              Ver recursos
            </Link>
          </div>
        </div>

        {/* Imagen más grande */}
        <div className="flex-1">
          <Image
            src="/hero-image.jpg"
            alt="Sesión de terapia"
            width={700}
            height={500}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
