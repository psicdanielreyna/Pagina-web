// app/sobre-mi/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sobre mí",
  description:
    "Psicólogo clínico cognitivo-conductual especializado en terapia breve TCC. Atención a adolescentes y adultos en línea y presencial.",
};

export default function SobreMiPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="mb-10">
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 mb-4">
            Sobre mí
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Hola, soy Daniel Reyna
          </h1>
        </div>

        {/* Hero expandido: texto + foto recortada */}
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-lg text-slate-800 leading-relaxed mb-4">
              Soy <strong>psicólogo clínico cognitivo-conductual</strong>,
              especializado en <strong>terapia breve TCC</strong>. Acompaño a{" "}
              <strong>adolescentes y adultos</strong> en México para trabajar
              temas de ansiedad, depresión, duelo, estrés y autoestima, con
              sesiones <strong>en línea</strong> y <strong>presenciales</strong>.
            </p>
            <p className="text-lg text-slate-800 leading-relaxed mb-8">
              Mi enfoque es claro y práctico: herramientas que puedes aplicar
              desde la primera sesión, a tu ritmo y con seguimiento.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/agenda"
                className="inline-flex items-center justify-center rounded-full px-6 py-3
                           text-white font-medium bg-teal-700 shadow-md transition
                           hover:bg-teal-800 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-700/60
                           active:scale-[0.98]"
              >
                Agendar una sesión
              </Link>

              <a
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                           border border-slate-300 text-slate-700 transition
                           hover:bg-slate-50 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
                aria-label="Instagram @psic.danielreyna"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-.75a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <span className="font-medium">@psic.danielreyna</span>
              </a>
            </div>
          </div>

          {/* Imagen recortada (con fondo blanco) */}
          <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/daniel-reyna-hero.webp"
                alt="Daniel Reyna Psicólogo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
