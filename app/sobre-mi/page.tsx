// app/sobre-mi/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Psicólogo clínico cognitivo-conductual. Acompaño a adolescentes y adultos en México con enfoque claro y práctico.",
};

function Inner() {
  return (
    <main>
      <HeroBanner
        badge="Sobre mí"
        title="Hola, soy Daniel Reyna"
        subtitle="Psicólogo clínico TCC. Herramientas prácticas para sentirte mejor en tu día a día."
        accentText="Conóceme"
        accentSub="Atención en línea y presencial en Monterrey, N.L."
      />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3 md:py-16">
        <article className="prose prose-zinc mx-auto md:col-span-2">
          <h2>Un poco sobre mí</h2>
          <p>
            Soy <strong>psicólogo clínico cognitivo-conductual</strong>, especializado en
            terapia breve TCC. Acompaño a <strong>adolescentes y adultos</strong> en México para
            trabajar temas de ansiedad, depresión, duelo, estrés y autoestima — con sesiones{" "}
            <strong>en línea y presenciales</strong>.
          </p>
          <p>
            Mi enfoque es claro y práctico: herramientas que puedes aplicar desde la primera
            sesión, a tu ritmo y con seguimiento.
          </p>

          <h3>Cómo trabajo</h3>
          <ul>
            <li>Objetivos concretos y medibles.</li>
            <li>Técnicas validadas de TCC y psicoeducación simple.</li>
            <li>Tareas breves entre sesiones para consolidar avances.</li>
          </ul>

          <h3>Lo que puedes esperar</h3>
          <p>
            Sesiones cálidas, directas y con estructura. No promesas mágicas;{" "}
            <em>herramientas sencillas que funcionan</em>.
          </p>
        </article>

        <aside className="md:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-black/8 bg-white p-5">
            <h3 className="text-sm font-medium text-zinc-900">Agenda una sesión</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Atención en línea y en Monterrey, N.L.
            </p>
            <div className="mt-4 space-y-2">
              <Link
                href="/agenda"
                className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2.5 text-sm text-white hover:bg-zinc-700 transition-colors"
              >
                Agendar ahora
              </Link>
              <Link
                href="mailto:danielreyna@danielreyna.com"
                className="inline-flex w-full items-center justify-center rounded-full border border-black/8 px-4 py-2.5 text-sm text-zinc-600 hover:bg-black/5 transition-colors"
              >
                Escribirme
              </Link>
            </div>
            <hr className="my-4 border-black/8" />
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>Enfoque TCC · terapia breve</li>
              <li>Adolescentes y adultos</li>
              <li>Monterrey · Online</li>
            </ul>
          </div>
        </aside>
      </section>

      <section id="contacto" className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl border border-black/8 bg-white p-6">
          <h3 className="text-sm font-medium text-zinc-900">Contacto directo</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Correo:{" "}
            <a href="mailto:danielreyna@danielreyna.com" className="text-emerald-700 hover:underline">
              danielreyna@danielreyna.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function SobreMiPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-400">Cargando…</div>}>
      <Inner />
    </Suspense>
  );
}