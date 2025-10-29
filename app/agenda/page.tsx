// app/agenda/page.tsx
import { Suspense } from "react";
import Link from "next/link";

export const metadata = {
  title: "Agenda",
  description:
    "Elige tu modalidad y reserva desde Calendly. Atención en línea y presencial.",
};

function Inner() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-6">
          <header className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink">
              Agenda tu sesión
            </h1>
            <p className="text-lg text-ink-soft">
              Selecciona el horario disponible que mejor te acomode.
            </p>
          </header>

          {/* Calendly embed */}
          <div className="card p-2">
            <iframe
              title="Calendly Daniel Reyna"
              src="https://calendly.com/psic-danielreyna/espacios-disponibles"
              className="w-full h-[900px] rounded-2xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="clipboard-write; fullscreen"
              frameBorder={0}
              scrolling="yes"
            />
          </div>

          <div className="text-center">
            <Link href="/servicios" className="link">
              ¿Aún no eliges modalidad? Ver servicios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AgendaPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Cargando agenda…</p>}>
      <Inner />
    </Suspense>
  );
}