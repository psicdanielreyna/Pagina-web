import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Enfoque TCC breve para ansiedad, depresión, duelo y autoestima. Atención en línea y presencial (Monterrey).",
  alternates: { canonical: "/servicios" },
};

const serviciosPrincipales = [
  {
    badge: "Individual",
    title: "Terapia individual",
    desc: "Sesión de 50 min. TCC para ansiedad, depresión y autoestima.",
    price: "$499",
    unit: "MXN · por sesión",
    popular: false,
  },
  {
    badge: "Mensual",
    title: "Paquete mensual",
    desc: "Sesiones ilimitadas durante un mes completo.",
    price: "$1,900",
    unit: "MXN · por mes",
    popular: true,
  },
  {
    badge: "Pareja",
    title: "Terapia de pareja",
    desc: "Sesión de 60 min. Comunicación y manejo de conflictos.",
    price: "$749",
    unit: "MXN · por sesión",
    popular: false,
  },
];

const serviciosExtra = [
  {
    title: "Cartas y constancias",
    precio: "Desde $500 MXN",
    href: "/contacto",
  },
  {
    title: "Supervisión de casos",
    precio: "$600 MXN por sesión",
    href: "/contacto",
  },
];

export default function ServiciosPage() {
  return (
    <main style={{ background: "#F8F5F0" }} className="min-h-screen">

      {/* Header */}
      <div className="border-b border-black/8 px-6 py-12" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-2">Servicios</p>
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight mb-2">
            Terapia Cognitivo-Conductual
          </h1>
          <p className="text-sm text-zinc-500">
            Atención en línea y presencial en Monterrey.
          </p>
        </div>
      </div>

      {/* Servicios principales */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-6">
          Opciones de atención
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {serviciosPrincipales.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl overflow-hidden flex flex-col"
              style={{ border: s.popular ? "2px solid #1D9E75" : "0.5px solid rgba(0,0,0,0.08)" }}
            >
              {/* Badge más popular */}
              {s.popular && (
                <div
                  className="text-center py-1.5 text-xs font-medium"
                  style={{ background: "#1D9E75", color: "#fff" }}
                >
                  Más popular
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                {/* Badge categoría */}
                <span
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit"
                  style={{ background: "#E1F5EE", color: "#0F6E56" }}
                >
                  {s.badge}
                </span>

                <h2 className="text-sm font-medium text-zinc-900 mb-2">{s.title}</h2>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1 mb-4">{s.desc}</p>

                <div className="text-2xl font-medium text-zinc-900">{s.price}</div>
                <div className="text-xs text-zinc-400 mb-5">{s.unit}</div>

                <Link
                  href="/agenda"
                  className="rounded-full bg-zinc-900 text-white text-xs font-medium px-4 py-2.5 text-center hover:bg-zinc-700 transition-colors w-fit"
                >
                  Agendar
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Servicios extra — compactos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviciosExtra.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-black/8 px-5 py-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900">{s.title}</p>
                <p className="text-xs text-zinc-400">{s.precio}</p>
              </div>
              <Link
                href={s.href}
                className="rounded-full border border-black/8 text-zinc-500 text-xs px-4 py-2 hover:bg-black/5 transition-colors whitespace-nowrap shrink-0"
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}