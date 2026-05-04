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
    <main style={{ background: "#F8F5F0" }} className="min-h-screen">

      {/* Hero centrado */}
      <div className="border-b border-black/8 px-6 py-16 text-center" style={{ background: "#F8F5F0" }}>
        <span className="inline-block text-xs font-medium bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mb-5">
          Newsletter semanal
        </span>
        <h1 className="text-4xl font-medium text-zinc-900 tracking-tight mb-3">
          Una idea práctica cada semana
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto mb-8">
          Únete a +10,000 personas. Recibes una{" "}
          <strong className="text-zinc-700">mini guía anti-estrés</strong>{" "}
          de bienvenida.
        </p>

        {/* Formulario */}
        <div className="max-w-sm mx-auto">
          <SubscribeForm />
        </div>
      </div>

      {/* Beneficios */}
      <div className="mx-auto max-w-md px-6 py-10">
        <div className="rounded-2xl border border-black/8 bg-white p-6">
          <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-5 text-center">
            ¿Qué recibirás?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {BENEFICIOS.map((b) => (
              <div key={b} className="flex items-start gap-2 text-sm text-zinc-600">
                <span className="text-emerald-600 shrink-0 mt-0.5">✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <p className="text-xs text-zinc-400 text-center mt-6 leading-relaxed">
          Sin spam · Baja cuando quieras ·{" "}
          <a href="/legal#privacidad" className="underline hover:text-zinc-600">
            Privacidad
          </a>
        </p>
      </div>
    </main>
  );
}