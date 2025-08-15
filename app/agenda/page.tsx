// app/agenda/page.tsx
import Script from "next/script"

export const metadata = {
  title: "Agenda | Daniel Reyna — Psicólogo",
  description:
    "Reserva una sesión de psicoterapia. Consulta disponibilidad y agenda en línea.",
}

export default function AgendaPage() {
  return (
    <section className="container mx-auto px-4 py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">Agenda</h1>
        <p className="text-neutral-700">
          Elige el horario que mejor te funcione. La confirmación te llega por correo.
        </p>
      </div>

      {/* Calendly inline */}
      <div
        className="calendly-inline-widget rounded-2xl border"
        data-url="https://calendly.com/psic-danielreyna/espacios-disponibles?primary_color=1f7a6f"
        style={{ minWidth: "320px", height: "780px" }}
      />

      {/* Script de Calendly */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  )
}

