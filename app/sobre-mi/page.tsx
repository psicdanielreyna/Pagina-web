// app/sobre-mi/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sobre mí",
  description:
    "Psicólogo clínico TCC breve. Experiencia con adolescentes y adultos, en línea y presencial.",
};

export default function SobreMiPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-5">
            <h1 className="text-4xl md:text-hero font-extrabold text-ink">
              Sobre mí
            </h1>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
              Soy <span className="font-semibold">psicólogo clínico cognitivo conductual</span>,
              especializado en <span className="font-semibold">terapia breve TCC</span>. Tengo
              experiencia trabajando con adolescentes y adultos en México, tanto
              en línea como de manera presencial.
            </p>
            <p className="text-lg text-ink-soft leading-relaxed">
              Mi enfoque está en ayudarte a manejar la ansiedad, el estrés, la
              depresión y los procesos de duelo, brindándote herramientas
              prácticas y efectivas para mejorar tu bienestar emocional.
            </p>

            <div className="pt-2">
              <Link
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-medium"
                aria-label="Ir a Instagram de Daniel Reyna"
              >
                <svg
                  aria-hidden
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
                Sígueme en Instagram: @psic.danielreyna
              </Link>
            </div>
          </div>

         {/* Foto (Sobre mí) */}
<div className="relative rounded-2xl border bg-white overflow-hidden shadow-sm">
  <div className="relative w-full min-h-[380px] md:min-h-[520px]">
    <Image
      src="/images/daniel-reyna-hero.webp"
      alt="Daniel Reyna Psicólogo"
      fill
      className="object-contain"
      sizes="(max-width: 1024px) 100vw, 600px"
      priority
    />
  </div>
</div>

        {/* Bloque breve de llamada a la acción */}
        <div className="mx-auto max-w-6xl mt-16 card p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            ¿Listo para comenzar?
          </h2>
          <p className="text-ink-soft mb-6">
            Agenda tu primera sesión o conoce más sobre los servicios.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/servicios" className="btn-primary">
              Ver servicios
            </Link>
            <Link href="/agenda" className="btn-ghost">
              Ir a la agenda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
