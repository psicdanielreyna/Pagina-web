// app/talleres/page.tsx
import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Talleres | Daniel Reyna",
  description:
    "Aprende y practica herramientas de terapia cognitivo-conductual en talleres y sesiones grupales. Modalidad online y presencial.",
  alternates: { canonical: "/talleres" },
};

export default function TalleresPage() {
  return (
    <main>
      <HeroBanner
        badge="Talleres"
        title="Aprende y practica en vivo"
        subtitle="Sesiones prácticas para sentirte mejor en tu día a día. Modalidad online y presencial."
        imageUrl="/talleres-hero.jpg?v=1" // asegúrate que el archivo esté en /public
      />

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <p className="mb-8 text-lg text-neutral-700">
          Aquí encontrarás mis próximos talleres, masterclasses y grupos prácticos.
          Si no alcanzas lugar, únete a la lista para enterarte primero cuando se
          abran nuevas fechas.
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Próximos talleres
        </h2>

        {/* Cards de talleres */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">
              Mini guía anti-estrés (en vivo)
            </h3>
            <p className="text-sm text-neutral-600 mb-3">
              Aprende técnicas prácticas para manejar el estrés en tu día a día.
            </p>
            <button className="rounded bg-green-600 px-4 py-2 text-white text-sm hover:bg-green-700">
              Registrarme
            </button>
          </div>

          <div className="rounded-lg border p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">Hábitos que sí se quedan</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Estrategias de TCC para construir y mantener hábitos saludables.
            </p>
            <button className="rounded bg-green-600 px-4 py-2 text-white text-sm hover:bg-green-700">
              Registrarme
            </button>
          </div>

          <div className="rounded-lg border p-5 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">
              Ansiedad: del bloqueo a la acción
            </h3>
            <p className="text-sm text-neutral-600 mb-3">
              Técnicas para transformar la ansiedad en energía para avanzar.
            </p>
            <button className="rounded bg-green-600 px-4 py-2 text-white text-sm hover:bg-green-700">
              Registrarme
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}