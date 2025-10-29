// app/sobre-mi/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import HeroAbout from "@/components/ui/HeroAbout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Psicólogo clínico cognitivo-conductual. Acompaño a adolescentes y adultos en México con enfoque claro y práctico.",
};

function Inner() {
  return (
    <main>
      <HeroAbout
        title="Conóceme"
        subtitle="Psicólogo clínico TCC. Herramientas prácticas para sentirte mejor en tu día a día."
        imageSrc="/images/sobre-mi-hero.jpg"
        imageAlt="Daniel Reyna"
      />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-3 md:py-16">
        <article className="prose prose-zinc mx-auto md:col-span-2">
          <h2>Hola, soy Daniel Reyna</h2>
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
          <div className="sticky top-20 rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Agenda una sesión</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Atención en línea y en Monterrey, N.L.
            </p>
            <div className="mt-4 space-y-3">
              <Link
                href="/agenda"
                className="inline-flex w-full items-center justify-center rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Agendar ahora
              </Link>
              <Link
                href="/sobre-mi#contacto"
                className="inline-flex w-full items-center justify-center rounded-md border px-4 py-2.5 text-sm font-medium hover:bg-zinc-50"
              >
                Escribirme
              </Link>
            </div>
            <hr className="my-4" />
            <ul className="space-y-2 text-sm text-zinc-700">
              <li>🧠 Enfoque TCC • terapia breve</li>
              <li>💬 Adolescentes y adultos</li>
              <li>📍 Monterrey • Online</li>
            </ul>
          </div>
        </aside>
      </section>

      <section id="contacto" className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Contacto</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Correo:{" "}
            <a href="mailto:danielreyna@danielreyna.com" className="underline">
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
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-600">Cargando…</div>}>
      <Inner />
    </Suspense>
  );
}