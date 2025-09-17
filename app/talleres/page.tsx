// app/talleres/page.tsx
import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talleres | Daniel Reyna",
  description:
    "Aprende y practica herramientas de TCC en talleres y sesiones grupales. Modalidad online y presencial.",
  alternates: { canonical: "/talleres" },
};

export default function TalleresPage() {
  return (
    <main>
      <HeroBanner
        badge="Talleres"
        title="Aprende y practica en vivo"
        subtitle="Sesiones prácticas para sentirte mejor en tu día a día. Modalidad online y presencial."
        // imageUrl="/hero-talleres.jpg" // opcional si añades la imagen a /public
      />

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-lg text-gray-700">
          Aquí encontrarás mis próximos talleres, masterclasses y grupos prácticos.
          Si no alcanzas lugar, únete a la lista para enterarte primero cuando se abran nuevas fechas.
        </p>
      </section>

      {/* Grid de próximos talleres (placeholders) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-semibold mb-6">Próximos talleres</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Mini guía anti-estrés (en vivo)",
              date: "Próximamente",
              desc: "Estrategias sencillas de TCC para el día a día.",
            },
            {
              title: "Hábitos que sí se quedan",
              date: "Próximamente",
              desc: "Cómo diseñar hábitos realistas y sostenibles.",
            },
            {
              title: "Ansiedad: del bloqueo a la acción",
              date: "Próximamente",
              desc: "Herramientas prácticas para avanzar pese a la ansiedad.",
            },
          ].map((w, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-gray-900">{w.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{w.date}</p>
              <p className="mt-3 text-gray-700">{w.desc}</p>
              <div className="mt-6">
                <Link
                  href="/#newsletter"
                  className="inline-flex items-center rounded-md bg-green-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                >
                  Avísame cuando abra
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA secundario */}
        <div className="mt-12 rounded-xl bg-emerald-50 p-6 text-center">
          <p className="text-emerald-900">
            ¿Quieres enterarte primero? Suscríbete a la newsletter y te aviso por correo.
          </p>
          <div className="mt-4">
            <Link
              href="/#newsletter"
              className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Ir a la newsletter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}