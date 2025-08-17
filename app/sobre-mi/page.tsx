// app/sobre-mi/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Sobre mí | Daniel Reyna Psicólogo",
  description:
    "Psicólogo clínico TCC. Acompaño a adolescentes y adultos en México, en línea y presencial.",
};

export default function SobreMiPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Hola, soy Daniel Reyna
            </h1>

            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p>
                Soy <span className="font-semibold">psicólogo clínico cognitivo-conductual</span>, especializado en{" "}
                <span className="font-semibold">terapia breve TCC</span>. Acompaño a{" "}
                <span className="font-semibold">adolescentes y adultos</span> en México para trabajar temas de
                ansiedad, depresión, duelo, estrés y autoestima, con sesiones{" "}
                <span className="font-semibold">en línea</span> y{" "}
                <span className="font-semibold">presenciales</span>.
              </p>

              <p>
                Mi enfoque es claro y práctico: herramientas que puedes aplicar desde la primera sesión, a tu ritmo y
                con seguimiento.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    fill="currentColor"
                    d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .4 1.5.9.5.4.7.9.9 1.5.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.4 1-.9 1.5-.4.5-.9.7-1.5.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.4-1.5-.9-.5-.4-.7-.9-.9-1.5-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.4-1 .9-1.5.4-.5.9-.7 1.5-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.5.2-1.9.3-.5.2-.8.3-1.1.6-.3.3-.5.6-.6 1.1-.1.4-.3.9-.3 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.5.3 1.9.2.5.3.8.6 1.1.3.3.6.5 1.1.6.4.1.9.3 1.9.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1-.1 1.5-.2 1.9-.3.5-.2.8-.3 1.1-.6.3-.3.5-.6.6-1.1.1-.4.3-.9.3-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.5-.3-1.9-.2-.5-.3-.8-.6-1.1-.3-.3-.6-.5-1.1-.6-.4-.1-.9-.3-1.9-.3-1.2-.1-1.6-.1-4.7-.1Zm0 3.7a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2Zm0 10.9a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Zm6.9-10.9a1.5 1.5 0 1 1-3.1 0 1.5 1.5 0 0 1 3.1 0Z"
                  />
                </svg>
                @psic.danielreyna
              </Link>

              <Link
                href="/agenda"
                className="inline-flex items-center rounded-full bg-emerald-700 text-white px-5 py-2.5 font-medium hover:bg-emerald-800"
              >
                Agendar sesión
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative w-full h-[520px] rounded-3xl border border-slate-100 overflow-hidden shadow-lg">
            <Image
              src="/images/daniel-reyna-hero.webp"
              alt="Daniel Reyna Psicólogo"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
