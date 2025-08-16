// app/sobre-mi/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sobre mí",
  description:
    "Psicólogo clínico TCC. Terapia breve, enfoque claro y práctico para adolescentes y adultos. Atención en línea y presencial.",
};

export default function SobreMiPage() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50/70">
      <div className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
        {/* Etiqueta */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
            Sobre mí
          </span>
        </div>

        {/* Grid principal */}
        <div className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:items-center">
          {/* Texto */}
          <div className="rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Hola, soy Daniel Reyna
            </h1>

            <p className="mb-4 text-lg leading-relaxed text-slate-700">
              Soy <span className="font-semibold">psicólogo clínico cognitivo-conductual</span>, 
              especializado en <span className="font-semibold">terapia breve</span>. 
              Acompaño a <span className="font-semibold">adolescentes y adultos</span> en México 
              para trabajar temas de ansiedad, depresión, duelo, estrés y autoestima, con sesiones 
              <span className="font-semibold"> en línea</span> y <span className="font-semibold">presenciales</span>.
            </p>

            <p className="mb-6 text-lg leading-relaxed text-slate-700">
              Mi enfoque es claro y práctico: herramientas que puedes aplicar desde la primera sesión, 
              al ritmo que te funcione.
            </p>

            {/* Bullets */}
            <ul className="mb-8 grid gap-3 text-slate-700 md:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Terapia Breve Cognitivo-Conductual (TCC)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Enfoque claro, práctico y basado en evidencia
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Adolescentes y adultos
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Modalidad en línea y presencial
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://calendly.com/psic-danielreyna/espacios-disponibles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/70"
              >
                Agendar sesión
              </a>

              <a
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30"
                aria-label="Ir a Instagram @psic.danielreyna"
              >
                {/* mini ícono IG en SVG para no depender de librerías */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.8 6.2a1 1 0 1 1-.2 2 1 1 0 0 1 .2-2z" />
                </svg>
                @psic.danielreyna
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="mx-auto w-full max-w-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100">
              <Image
                src="/images/daniel-reyna-hero.webp"
                alt="Daniel Reyna — Psicólogo clínico"
                fill
                sizes="(max-width: 1024px) 90vw, 540px"
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Micro-copy final, por si lo quieres usar */}
        <div className="mt-10 text-sm text-slate-500">
          Monterrey, Nuevo León · Atención en línea y presencial.
        </div>
      </div>
    </section>
  );
}
