// app/servicios/page.tsx
import Link from "next/link"

export const metadata = {
  title: "Servicios | Daniel Reyna — Psicólogo",
  description:
    "Terapia individual, paquete mensual y terapia de pareja. Enfoque CBT breve para ansiedad, depresión, duelo y autoestima.",
}

type Servicio = {
  key: "individual" | "paquete" | "pareja"
  title: string
  description: string
  price: number // en MXN
  href: string
}

const servicios: Servicio[] = [
  {
    key: "individual",
    title: "Terapia individual",
    description: "Sesión de 50 minutos.",
    price: 499, // <-- cambia aquí
    href: "/agenda?t=individual",
  },
  {
    key: "paquete",
    title: "Paquete mensual",
    description: "4 sesiones al mes a precio preferente.",
    price: 1900, // <-- cambia aquí
    href: "/agenda?t=paquete",
  },
  {
    key: "pareja",
    title: "Terapia de pareja",
    description: "Sesión de 80 minutos enfocada en comunicación y acuerdos.",
    price: 749, // <-- cambia aquí
    href: "/agenda?t=pareja",
  },
]

function formatMXN(v: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(v)
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
        {servicios.map((s) => (
          <ServiceCard
            key={s.key}
            title={s.title}
            description={s.description}
            price={s.price}
            href={s.href}
          />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  title,
  description,
  price,
  href,
}: {
  title: string
  description: string
  price: number
  href: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>

      <div className="mt-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-800">
          {formatMXN(price)} <span className="text-neutral-500">MXN</span>
        </span>
      </div>

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
