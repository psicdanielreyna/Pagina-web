import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Daniel Reyna – Psicólogo",
  description: "Resuelve tus dudas sobre sesiones, pagos, newsletter y recursos psicológicos.",
  alternates: { canonical: "/faq" },
};

type QA = { q: string; a: string };

const faqs: QA[] = [
  { q: "¿Ofreces sesiones en línea, presenciales o ambas?", a: "Actualmente trabajo principalmente en línea por videollamada. Si necesitas una sesión presencial, escríbeme para revisar disponibilidad." },
  { q: "¿Cómo puedo agendar una sesión?", a: "Puedes hacerlo desde la sección de servicios o agenda en la web. Recibirás un correo de confirmación con los pasos a seguir." },
  { q: "¿Qué tipo de terapia utilizas?", a: "Trabajo con Terapia Cognitivo-Conductual (TCC) y técnicas basadas en evidencia para tratar ansiedad, depresión, estrés y autoestima." },
  { q: "¿Cómo se realizan los pagos?", a: "Puedes pagar con tarjeta de crédito o débito directamente en el sitio a través de Stripe, de forma segura y rápida." },
  { q: "¿Puedo cambiar o cancelar una cita?", a: "Sí, puedes hacerlo avisando con al menos 24 horas de anticipación para reprogramar sin costo." },
  { q: "¿Cómo me doy de baja del newsletter?", a: "En cada correo encontrarás un enlace para darte de baja. También puedes hacerlo desde /unsubscribe." },
  { q: "¿Dónde puedo descargar la mini guía gratuita?", a: "El enlace llega automáticamente a tu correo después de suscribirte. Si no lo encuentras, revisa tu carpeta de spam." },
  { q: "¿Atiendes casos de emergencia?", a: "No. Si estás en una situación de riesgo o crisis, contacta los servicios de emergencia o líneas de ayuda en tu localidad." },
];

function FaqJsonLd({ items }: { items: QA[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      }}
    />
  );
}

export default function FAQPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      <FaqJsonLd items={faqs} />
      <div className="px-6 py-12" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>FAQ</p>
          <h1 className="text-3xl font-medium tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>Preguntas frecuentes</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Aquí encontrarás respuestas a las dudas más comunes. Si no ves la tuya,{" "}
            <a href="/contacto" style={{ color: "var(--accent-text)" }} className="hover:underline">escríbeme aquí</a>.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col gap-2">
          {faqs.map((item) => (
            <details key={item.q} className="group rounded-2xl overflow-hidden" style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <h2 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.q}</h2>
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-transform group-open:rotate-180" style={{ border: "0.5px solid var(--border)", color: "var(--text-tertiary)" }}>▾</span>
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "var(--text-secondary)", borderTop: "0.5px solid var(--border)" }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 rounded-2xl p-6" style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>¿No encontraste lo que buscabas?</h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Puedes contactarme directamente y te respondo a la brevedad.</p>
          <a href="/contacto" className="inline-block rounded-full text-xs px-5 py-2.5 transition-colors" style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}>
            Contactarme →
          </a>
        </div>
      </div>
    </main>
  );
}
