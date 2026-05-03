// app/talleres/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Talleres | Daniel Reyna",
  description:
    "Aprende y practica herramientas de terapia cognitivo-conductual en talleres y sesiones grupales. Modalidad online y presencial.",
  alternates: { canonical: "/talleres" },
};

const talleres = [
  {
    title: "Mini guía anti-estrés (en vivo)",
    desc: "Aprende técnicas prácticas para manejar el estrés en tu día a día.",
  },
  {
    title: "Hábitos que sí se quedan",
    desc: "Estrategias de TCC para construir y mantener hábitos saludables.",
  },
  {
    title: "Ansiedad: del bloqueo a la acción",
    desc: "Técnicas para transformar la ansiedad en energía para avanzar.",
  },
];

function Inner() {
  return (
    <main>
      <HeroBanner
        badge="Talleres"
        title="Aprende y practica en vivo"
        subtitle="Sesiones prácticas para sentirte mejor en tu día a día. Modalidad online y presencial."
        accentText="Próximas fechas"
        accentSub="Únete a la lista y sé el primero en enterarte cuando se abran nuevas fechas."
      />

      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="text-sm text-zinc-500 leading-relaxed mb-10 max-w-2xl">
          Aquí encontrarás mis próximos talleres, masterclasses y grupos prácticos.
          Si no alcanzas lugar, únete a la lista para enterarte primero cuando se
          abran nuevas fechas.
        </p>

        <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-6">
          Próximos talleres
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {talleres.map((t) => (
            <article
              key={t.title}
              className="rounded-2xl border border-black/8 bg-white p-6 flex flex-col hover:shadow-sm transition-shadow"
            >
              <h3 className="text-sm font-medium text-zinc-900 mb-2">{t.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">{t.desc}</p>
              <button className="mt-5 rounded-full bg-zinc-900 text-white text-xs px-4 py-2 hover:bg-zinc-700 transition-colors w-fit">
                Registrarme
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function TalleresPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-zinc-400">Cargando…</div>}>
      <Inner />
    </Suspense>
  );
}