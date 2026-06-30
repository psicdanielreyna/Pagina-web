import type { Metadata } from "next";
import Link from "next/link";
import Opiniones from "@/components/Opiniones";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Enfoque TCC breve para ansiedad, depresión, duelo y autoestima. Atención en línea y presencial (Monterrey).",
  alternates: { canonical: "/servicios" },
};

// 👉 Para desactivar la promo después de julio, cambia esto a false
const PROMO_ACTIVE = true;

const serviciosPrincipales = [
  {
    badge: "Individual",
    title: "Terapia individual",
    desc: "Sesión de 50 min. TCC para ansiedad, depresión y autoestima.",
    price: "$499",
    promoPrice: "$250",
    unit: "MXN · por sesión",
    popular: false,
  },
  {
    badge: "Mensual",
    title: "Paquete mensual",
    desc: "Sesiones ilimitadas durante un mes completo.",
    price: "$1,900",
    promoPrice: "$950",
    unit: "MXN · por mes",
    popular: true,
  },
  {
    badge: "Pareja",
    title: "Terapia de pareja",
    desc: "Sesión de 60 min. Comunicación y manejo de conflictos.",
    price: "$749",
    promoPrice: null,
    unit: "MXN · por sesión",
    popular: false,
  },
];

const serviciosExtra = [
  { title: "Cartas y constancias", precio: "Desde $500 MXN", href: "/contacto" },
  { title: "Supervisión de casos", precio: "$600 MXN por sesión", href: "/contacto" },
];

export default function ServiciosPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">

      <div className="px-6 py-12" style={{ background: "var(--bg-primary)", borderBottom: "0.5px solid var(--border)" }}>
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>Servicios</p>
          <h1 className="text-3xl font-medium tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
            Terapia Cognitivo-Conductual
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Atención en línea y presencial en Monterrey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: "var(--text-tertiary)" }}>
          Opciones de atención
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {serviciosPrincipales.map((s) => {
            const showPromo = PROMO_ACTIVE && s.promoPrice;
            return (
              <div
                key={s.title}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "var(--bg-card)",
                  border: s.popular ? "2px solid #1D9E75" : "0.5px solid var(--border)",
                }}
              >
                {s.popular && (
                  <div className="text-center py-1.5 text-xs font-medium" style={{ background: "#1D9E75", color: "#fff" }}>
                    Más popular
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="inline-block text-xs font-medium px-3 py-1 rounded-full w-fit"
                      style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
                    >
                      {s.badge}
                    </span>
                    {showPromo && (
                      <span
                        className="inline-block text-xs font-medium px-3 py-1 rounded-full w-fit"
                        style={{ background: "#3D2020", color: "#E8C88A" }}
                      >
                        Julio Regalado
                      </span>
                    )}
                  </div>
                  <h2 className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>{s.title}</h2>
                  <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>

                  {showPromo ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-medium line-through" style={{ color: "var(--text-tertiary)" }}>
                        {s.price}
                      </span>
                      <span className="text-2xl font-medium" style={{ color: "#8B1A1A" }}>
                        {s.promoPrice}
                      </span>
                    </div>
                  ) : (
                    <div className="text-2xl font-medium" style={{ color: "var(--text-primary)" }}>{s.price}</div>
                  )}
                  <div className="text-xs mb-5" style={{ color: "var(--text-tertiary)" }}>{s.unit}</div>

                  <Link
                    href="/agenda"
                    className="rounded-full text-xs font-medium px-4 py-2.5 text-center transition-colors w-fit"
                    style={
                      showPromo
                        ? { background: "#8B1A1A", color: "#E8C88A" }
                        : { background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }
                    }
                  >
                    Agendar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviciosExtra.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
              style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{s.title}</p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>{s.precio}</p>
              </div>
              <Link
                href={s.href}
                className="rounded-full text-xs px-4 py-2 transition-colors whitespace-nowrap shrink-0"
                style={{ border: "0.5px solid var(--border)", color: "var(--text-secondary)" }}
              >
                Ver más
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Opiniones */}
      <div className="border-t px-6 py-12" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl">
          <Opiniones tipo="sesion" title="Opiniones de pacientes" />
        </div>
      </div>

    </main>
  );
}