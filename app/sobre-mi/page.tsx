import Image from "next/image";
import Link from "next/link";

export default function SobreMiPage() {
  return (
    <main>
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Hola, soy Daniel Reyna
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Soy <span className="font-semibold">psicólogo clínico cognitivo-conductual</span>,
                especializado en <span className="font-semibold">terapia breve TCC</span>.
                Acompaño a <span className="font-semibold">adolescentes y adultos</span> en México
                para trabajar temas de ansiedad, depresión, duelo, estrés y autoestima, con sesiones
                <span className="font-semibold"> en línea</span> y <span className="font-semibold">presenciales</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mi enfoque es claro y práctico: herramientas que puedes aplicar desde la primera sesión,
                a tu ritmo y con seguimiento.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/agendar"
                  className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                >
                  Agendar una sesión
                </Link>
                <a
                  href="https://instagram.com/psic.danielreyna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-muted transition"
                >
                  <span>Instagram</span>
                  <span className="text-muted-foreground">@psic.danielreyna</span>
                </a>
              </div>
            </div>

            {/* Foto personal */}
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
          </div>
        </div>
      </section>
    </main>
  );
}
