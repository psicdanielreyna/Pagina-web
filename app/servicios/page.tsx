import type { Metadata } from "next";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Enfoque TCC breve para ansiedad, depresión, duelo y autoestima. Atención en línea y presencial (Monterrey).",
  alternates: { canonical: "/servicios" },
};

const servicios = [
  {
    title: "Terapia individual",
    desc: "Sesión de 50 minutos. Enfoque TCC breve: ansiedad, depresión, duelo y autoestima. Incluye materiales y ejercicios prácticos.",
    price: "MXN $499",
  },
  {
    title: "Paquete mensual (sesiones ilimitadas)",
    desc: "Acompañamiento continuo durante un mes. Agenda cuantas sesiones necesites dentro del periodo para avanzar en tus objetivos.",
    price: "MXN $1,900",
  },
  {
    title: "Terapia de pareja",
    desc: "Sesión de 60 minutos. Comunicación, manejo de conflictos y acuerdos prácticos y realistas.",
    price: "MXN $749",
  },
];

const extras = [
  {
    title: "Cartas y constancias psicológicas",
    desc: "Entrevista clínica y emisión de constancia/carta para certificar la atención o apoyo psicológico requerido por instituciones, escuelas o empleos.",
    items: ["Entrevista: MXN $500", "Carta/constancia: MXN $1,000"],
    cta: { label: "Agendar entrevista", href: "/agenda" },
    sec: { label: "Solicitar información", href: "/contacto" },
  },
  {
    title: "Supervisión y asesoría de casos",
    desc: "Servicio dirigido a psicólogos que buscan retroalimentación y acompañamiento profesional en la atención de sus pacientes.",
    price: "MXN $600 por sesión",
    cta: { label: "Agendar", href: "/agenda" },
    sec: { label: "Más información", href: "/contacto" },
  },
];

export default function ServiciosPage() {
  return (
    <>
      <HeroBanner
        badge="Servicios"
        title="Terapia Cognitivo-Conductual"
        subtitle="Atención en línea y presencial en Monterrey. Herramientas prácticas enfocadas a objetivos."
        accentText="Agenda tu proceso"
        accentSub="Primera sesión sin compromiso. En línea o presencial en Monterrey."
      />

      {/* Intro */}
      <section className="border-b border-black/8 py-12" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-3xl px-4 text-center space-y-4">
          <p className="text-base text-zinc-700 leading-relaxed">
            Trabajo con <strong className="text-zinc-900">Terapia Cognitivo-Conductual (TCC)</strong> breve para
            ansiedad, depresión, duelo y autoestima. Esta terapia se centra en cómo
            tus pensamientos influyen en tus emociones y comportamientos.
          </p>
          <p className="text-base text-zinc-700 leading-relaxed">
            Acompañamiento claro, práctico y con ejercicios entre sesiones para que
            veas avances en tu día a día.
          </p>
        </div>
      </section>

      {/* Servicios principales */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-8">
            Opciones de atención
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {servicios.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-black/8 bg-white p-6 flex flex-col"
              >
                <h3 className="text-sm font-medium text-zinc-900 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">{s.desc}</p>
                <p className="mt-4 text-base font-medium text-zinc-900">{s.price}</p>
                <Link
                  href="/agenda"
                  className="mt-4 inline-block rounded-full bg-zinc-900 text-white text-xs px-4 py-2 text-center hover:bg-zinc-700 transition-colors w-fit"
                >
                  Agendar
                </Link>
              </article>
            ))}
          </div>

          {/* Extras */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {extras.map((s) => (
              <article
                key={s.title}
                className="rounded-2xl border border-black/8 bg-white p-6 flex flex-col"
              >
                <h3 className="text-sm font-medium text-zinc-900 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">{s.desc}</p>
                {s.items && (
                  <ul className="mt-3 space-y-1">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-zinc-700">• {item}</li>
                    ))}
                  </ul>
                )}
                {s.price && (
                  <p className="mt-3 text-base font-medium text-zinc-900">{s.price}</p>
                )}
                <div className="mt-4 flex gap-3">
                  <Link
                    href={s.cta.href}
                    className="rounded-full bg-zinc-900 text-white text-xs px-4 py-2 hover:bg-zinc-700 transition-colors"
                  >
                    {s.cta.label}
                  </Link>
                  <Link
                    href={s.sec.href}
                    className="rounded-full border border-black/8 text-zinc-600 text-xs px-4 py-2 hover:bg-black/5 transition-colors"
                  >
                    {s.sec.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}