// app/agenda/page.tsx
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Agendar cita | Daniel Reyna – Psicólogo",
  description: "Agenda tu sesión individual, paquete mensual o terapia de pareja.",
}

const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n)

export default function AgendaPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold">Agendar cita</h1>
        <p className="text-muted-foreground mt-2">
          Elige la opción que mejor se adapte a lo que necesitas. Los pagos y la programación se realizan en Calendly.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Sesión individual */}
        <div className="rounded-2xl border bg-card p-6 flex flex-col">
          <div className="mb-3 text-sm font-medium text-muted-foreground">Sesión individual</div>
          <div className="text-3xl font-semibold">{mxn(499)}</div>
          <div className="text-sm text-muted-foreground mb-4">50 minutos</div>
          <p className="text-sm text-muted-foreground flex-1">
            Terapia personalizada con enfoque CBT breve.
          </p>
          <Button asChild className="mt-6">
            {/* 👉 Reemplaza por tu URL real de Calendly */}
            <Link href="https://calendly.com/psic-danielreyna/espacios-disponibles-julio" target="_blank" rel="noopener noreferrer">
              Agendar ahora
            </Link>
          </Button>
        </div>

        {/* Paquete mensual */}
        <div className="rounded-2xl border bg-card p-6 flex flex-col">
          <div className="mb-3 text-sm font-medium text-muted-foreground">Paquete mensual</div>
          <div className="text-3xl font-semibold">{mxn(1900)}</div>
          <div className="text-sm text-muted-foreground mb-4">4 sesiones de 50 min</div>
          <p className="text-sm text-muted-foreground flex-1">
            Ideal para seguimiento continuo y ahorro mensual.
          </p>
          <Button asChild className="mt-6">
            {/* 👉 Reemplaza por tu URL real de Calendly */}
            <Link href="https://calendly.com/psic-danielreyna/espacios-disponibles-julio" target="_blank" rel="noopener noreferrer">
              Agendar ahora
            </Link>
          </Button>
        </div>

        {/* Pareja */}
        <div className="rounded-2xl border bg-card p-6 flex flex-col">
          <div className="mb-3 text-sm font-medium text-muted-foreground">Terapia de pareja</div>
          <div className="text-3xl font-semibold">{mxn(749)}</div>
          <div className="text-sm text-muted-foreground mb-4">1 hora</div>
          <p className="text-sm text-muted-foreground flex-1">
            Espacio para mejorar la comunicación y resolver conflictos.
          </p>
          <Button asChild className="mt-6">
            {/* 👉 Reemplaza por tu URL real de Calendly */}
            <Link href="https://calendly.com/psic-danielreyna/espacios-disponibles-julio" target="_blank" rel="noopener noreferrer">
              Agendar ahora
            </Link>
          </Button>
        </div>
      </div>

      {/* Conferencias y talleres */}
      <div className="mt-10 rounded-2xl border bg-card p-6">
        <div className="mb-1 text-sm font-medium text-muted-foreground">Conferencias y/o talleres</div>
        <p className="text-sm text-muted-foreground">
          Para cotizaciones y disponibilidad, escríbenos a{" "}
          <a className="underline" href="mailto:psic.danielreyna@gmail.com">psic.danielreyna@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
