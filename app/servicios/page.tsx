// app/servicios/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Servicios | Daniel Reyna — Psicólogo",
  description:
    "Terapia individual, paquete mensual y terapia de pareja. Enfoque CBT breve para ansiedad, depresión, duelo y autoestima.",
}

export default function ServiciosPage() {
  return (
    <section className="container mx-auto px-4 py-16 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold">Servicios</h1>
      <p className="text-neutral-700">
        Enfoque CBT breve: ansiedad, depresión, duelo y autoestima.
      </p>

      <h2 className="text-xl font-semibold">Modalidades</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          title="Terapia individual"
          description="Sesión de 50 minutos."
          href="/agenda?t=individual"
        />
        <ServiceCard
          title="Paquete mensual"
          description="4 sesiones al mes a precio preferente."
          href="/agenda?t=paquete"
        />
        <ServiceCard
          title="Terapia de pareja"
          description="Sesión de 80 minutos enfocada en comunicación y acuerdos."
          href="/agenda?t=pareja"
        />
      </div>
    </section>
  )
}

function ServiceCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
      <div className="mt-5">
        <Link
          href={href}
          className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Agendar
        </Link>
      </div>
    </div>
  )
}
