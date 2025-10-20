// app/faq/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes (FAQ) | Daniel Reyna – Psicólogo",
  description:
    "Resuelve tus dudas sobre sesiones, pagos, newsletter y recursos psicológicos. Todo explicado de forma clara y sencilla.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Daniel Reyna – Psicólogo",
    description:
      "Encuentra respuestas sobre terapia, pagos, newsletter y recursos de bienestar mental.",
    url: "/faq",
    type: "website",
  },
};

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "¿Ofreces sesiones en línea, presenciales o ambas?",
    a: "Actualmente trabajo principalmente en línea (por videollamada). Si necesitas una sesión presencial, escríbeme para revisar disponibilidad.",
  },
  {
    q: "¿Cómo puedo agendar una sesión?",
    a: "Puedes hacerlo desde la sección de contacto o agenda en la web. Recibirás un correo de confirmación con los pasos a seguir.",
  },
  {
    q: "¿Qué tipo de terapia utilizas?",
    a: "Trabajo con Terapia Cognitivo-Conductual (TCC) y técnicas basadas en evidencia para tratar ansiedad, depresión, estrés y autoestima.",
  },
  {
    q: "¿Cómo se realizan los pagos?",
    a: "Puedes pagar con tarjeta, transferencia o Mercado Pago. Al agendar tu sesión, recibirás un enlace de pago.",
  },
  {
    q: "¿Puedo cambiar o cancelar una cita?",
    a: "Sí, puedes hacerlo avisando con al menos 24 horas de anticipación para reprogramar sin costo.",
  },
  {
    q: "¿Cómo me doy de baja del newsletter?",
    a: "En cada correo encontrarás un enlace para darte de baja. También puedes hacerlo directamente desde /unsubscribe.",
  },
  {
    q: "¿Dónde puedo descargar la mini guía gratuita?",
    a: "El enlace llega automáticamente a tu correo después de suscribirte. Si no lo encuentras, revisa tu carpeta de spam o promociones.",
  },
  {
    q: "¿Atiendes casos de emergencia?",
    a: "No. Si estás en una situación de riesgo o crisis, por favor contacta los servicios de emergencia o líneas de ayuda en tu localidad.",
  },
];

function FaqJsonLd({ items }: { items: QA[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // @ts-ignore - JSON string is valid here
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <FaqJsonLd items={faqs} />

      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Preguntas frecuentes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Aquí encontrarás respuestas a las dudas más comunes. Si no ves la tuya,{" "}
          <a href="/contacto" className="underline">
            escríbeme aquí
          </a>
          .
        </p>
      </header>

     <section className="space-y-4">
  {faqs.map((item) => (
    <details
      key={item.q}
      className="group mx-auto w-full rounded-lg border border-emerald-200 bg-emerald-50/70 p-5 text-center shadow-sm transition-all hover:shadow-md open:bg-emerald-100"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-emerald-900">
        <h2 className="mx-auto text-base font-semibold text-emerald-900">
          {item.q}
        </h2>
        <span
          aria-hidden
          className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md border border-emerald-300 bg-white text-sm text-emerald-700 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="mt-3 text-sm text-emerald-900/90">{item.a}</div>
    </details>
  ))}
</section>

      <aside className="mt-10 rounded-lg border p-5">
        <h3 className="text-base font-semibold">¿No encontraste lo que buscabas?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Puedes visitar la página de{" "}
          <a href="/recursos" className="underline">
            recursos
          </a>{" "}
          o contactarme directamente para resolver tus dudas.
        </p>
      </aside>
    </main>
  );
}