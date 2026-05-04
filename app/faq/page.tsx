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
    <main style={{ background: "#F8F5F0" }} className="min-h-screen">
      <FaqJsonLd items={faqs} />
      <div className="border-b border-black/8 px-6 py-12" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-2">FAQ</p>
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight mb-2">Preguntas frecuentes</h1>
          <p className="text-sm text-zinc-500">
            Aquí encontrarás respuestas a las dudas más comunes. Si no ves la tuya,{" "}
            <a href="/contacto" className="text-emerald-700 hover:underline">escríbeme aquí</a>.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col gap-2">
          {faqs.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-black/8 bg-white overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <h2 className="text-sm font-medium text-zinc-900">{item.q}</h2>
                <span className="shrink-0 w-5 h-5 rounded-full border border-black/8 flex items-center justify-center text-zinc-400 text-xs transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed border-t border-black/8 pt-3">
                {item.a}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-black/8 bg-white p-6">
          <h3 className="text-sm font-medium text-zinc-900 mb-1">¿No encontraste lo que buscabas?</h3>
          <p className="text-sm text-zinc-500 mb-4">Puedes contactarme directamente y te respondo a la brevedad.</p>
          <a href="/contacto" className="inline-block rounded-full bg-zinc-900 text-white text-xs px-5 py-2.5 hover:bg-zinc-700 transition-colors">
            Contactarme →
          </a>
        </div>
      </div>
    </main>
  );
}
