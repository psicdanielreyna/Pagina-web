import type { Metadata } from "next";
import { SubscribeForm } from "./subscribe-form";

export const metadata: Metadata = {
  title: "Newsletter | Daniel Reyna – Psicólogo",
  description: "Únete y recibe ideas prácticas sobre ansiedad, estrés y bienestar emocional cada semana.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter de Daniel Reyna",
    description: "Recibe ideas breves, prácticas y recursos sobre bienestar mental. Suscríbete gratis.",
    url: "https://danielreyna.com/newsletter",
    type: "website",
    images: [{ url: "/newsletter/hero.jpg", width: 1200, height: 630 }],
  },
};

const BENEFICIOS = [
  "Ideas prácticas cada semana",
  "Recursos descargables exclusivos",
  "Mini guía anti-estrés de bienvenida",
  "Reflexiones sobre ansiedad y bienestar",
];

export default function NewsletterPage() {
  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">

      <div className="px-6 py-16 text-center" style={{ borderBottom: "0.5px solid var(--border)" }}>
        <span
          className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-5"
          style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
        >
          Newsletter semanal
        </span>
        <h1 className="text-4xl font-medium tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
          Una idea práctica cada semana
        </h1>
        <p className="text-sm leading-relaxed max-w-sm mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          Únete a +10,000 personas. Recibes una{" "}
          <strong style={{ color: "var(--text-primary)" }}>mini guía anti-estrés</strong>{" "}
          de bienvenida.
        </p>
        <div className="max-w-sm mx-auto">
          <SubscribeForm />
        </div>
      </div>

      <div className="mx-auto max-w-md px-6 py-10">
        <div
          className="rounded-2xl p-6"
          style={{ border: "0.5px solid var(--border)", background: "var(--bg-card)" }}
        >
          <h3
            className="text-xs font-medium uppercase tracking-widest mb-5 text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            ¿Qué recibirás?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {BENEFICIOS.map((b) => (
              <div key={b} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)" }} className="shrink-0 mt-0.5">✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center mt-6 leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
          Sin spam · Baja cuando quieras ·{" "}
          <a href="/legal#privacidad" className="underline hover:opacity-70">
            Privacidad
          </a>
        </p>
      </div>
    </main>
  );
}