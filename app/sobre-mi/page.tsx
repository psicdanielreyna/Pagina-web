import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre mí — Daniel Reyna",
  description:
    "Psicólogo clínico cognitivo-conductual especializado en terapia breve. Trabajo con adolescentes y adultos en México, tanto en línea como de forma presencial.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="container mx-auto px-4 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Copy */}
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium">
              Sobre mí
            </span>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Hola, soy <span className="text-blue-700">Daniel Reyna</span>
            </h1>

            <p className="text-neutral-700 text-lg leading-relaxed">
              Soy <strong>psicólogo clínico cognitivo-conductual</strong>,
              especializado en <strong>terapia breve</strong>. Acompaño a
              <strong> adolescentes y adultos</strong> en México para trabajar
              temas de ansiedad, depresión, duelo, estrés y autoestima, con
              sesiones <strong>en línea</strong> y <strong>presenciales</strong>.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/servicios"
                className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition"
              >
                Agendar una sesión
              </Link>

              <a
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-5 py-2.5 hover:bg-neutral-50 transition"
                aria-label="Instagram @psic.danielreyna"
              >
                {/* simple IG icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2zM17.8 6a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" />
                </svg>
                @psic.danielreyna
              </a>
            </div>

            <ul className="text-sm text-neutral-600 grid sm:grid-cols-2 gap-2 pt-4">
              <li>• Terapia Breve Cognitivo-Conductual (TCC)</li>
              <li>• Enfoque claro y práctico</li>
              <li>• Adolescentes y adultos</li>
              <li>• Modalidad en línea y presencial</li>
            </ul>
          </div>

          {/* Foto */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border bg-white shadow-xl">
              <Image
                src="/images/daniel-reyna-hero.webp"
                alt="Daniel Reyna — Psicólogo clínico"
                width={900}
                height={900}
                priority
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 520px, 90vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE CORTO DE VALOR */}
      <section className="border-t bg-neutral-50/60">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border p-6">
              <h3 className="font-semibold mb-1">Herramientas claras</h3>
              <p className="text-neutral-600">
                Pasos concretos que puedes aplicar desde la primera sesión.
              </p>
            </div>
            <div className="rounded-2xl bg-white border p-6">
              <h3 className="font-semibold mb-1">Proceso breve y enfocado</h3>
              <p className="text-neutral-600">
                Objetivos definidos y avances medibles.
              </p>
            </div>
            <div className="rounded-2xl bg-white border p-6">
              <h3 className="font-semibold mb-1">A tu ritmo</h3>
              <p className="text-neutral-600">
                Sesiones en línea o presenciales según te acomode.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/servicios"
              className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition"
            >
              Ver modalidades y precios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
