import type { Metadata } from "next";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import Opiniones from "@/components/Opiniones";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Enfoque TCC breve para ansiedad, depresión, duelo y autoestima. Atención en línea y presencial (Monterrey).",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <HeroBanner
        badge="Servicios"
        title="Agenda tu proceso con Terapia Cognitivo-Conductual"
        subtitle="Atención en línea y presencial (Monterrey). Herramientas prácticas y enfocadas a objetivos."
        imageUrl="/hero-servicios.jpg"
      />

      {/* Intro beige */}
      <section className="bg-[#FEEDCB] py-10">
        <div className="container mx-auto max-w-3xl px-4 text-center space-y-6">
          <p className="text-base md:text-lg text-gray-800">
            Trabajo con <strong>Terapia Cognitivo-Conductual (TCC)</strong> breve para
            ansiedad, depresión, duelo y autoestima. Esta terapia se centra en cómo
            tus pensamientos influyen en tus emociones y comportamientos, ayudándote
            a identificar y cambiar patrones poco útiles.
          </p>
          <p className="text-base md:text-lg text-gray-800">
            Acompañamiento claro, práctico y con ejercicios entre sesiones para que
            veas avances en tu día a día.
          </p>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-gray-900">
            Opciones de atención
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Terapia individual */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-900">Terapia individual</h3>
              <p className="mt-2 text-sm text-gray-700">
                Sesión de 50 minutos. Enfoque TCC breve: ansiedad, depresión, duelo y
                autoestima. Incluye materiales y ejercicios prácticos.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">MXN $499</p>
              <div className="mt-5 flex gap-3">
                <Link href="/agenda" className="btn-primary">Agendar</Link>
                <Link href="/agenda" className="link-secondary">Ver disponibilidad</Link>
              </div>
            </article>

            {/* Paquete mensual */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-900">
                Paquete mensual (sesiones ilimitadas)
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Acompañamiento continuo durante un mes. Agenda cuantas sesiones
                necesites dentro del periodo para avanzar en tus objetivos.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">MXN $1,900</p>
              <div className="mt-5 flex gap-3">
                <Link href="/agenda" className="btn-primary">Agendar</Link>
                <Link href="/agenda" className="link-secondary">Ver disponibilidad</Link>
              </div>
            </article>

            {/* Terapia de pareja */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-900">Terapia de pareja</h3>
              <p className="mt-2 text-sm text-gray-700">
                Sesión de 60 minutos. Comunicación, manejo de conflictos y
                acuerdos prácticos y realistas.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">MXN $749</p>
              <div className="mt-5 flex gap-3">
                <Link href="/agenda" className="btn-primary">Agendar</Link>
                <Link href="/agenda" className="link-secondary">Ver disponibilidad</Link>
              </div>
            </article>
          </div>

          {/* Extra services */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Cartas y constancias */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-900">
                Cartas y constancias psicológicas
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Entrevista clínica y emisión de constancia/carta (física y digital) para
                certificar la atención o apoyo psicológico requerido por instituciones,
                escuelas o empleos.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                <li>• Entrevista: <span className="font-semibold">MXN $500</span></li>
                <li>• Carta/constancia: <span className="font-semibold">MXN $1,000</span></li>
              </ul>
              <div className="mt-5 flex gap-3">
                <Link href="/agenda" className="btn-primary">Agendar entrevista</Link>
                <Link href="/contacto" className="link-secondary">Solicitar información</Link>
              </div>
            </article>

            {/* Supervisión de casos */}
            <article className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-900">
                Supervisión y asesoría de casos
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                Servicio dirigido a psicólogos que buscan retroalimentación y
                acompañamiento profesional en la atención de sus pacientes.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-900">
                MXN $600 por sesión
              </p>
              <div className="mt-5 flex gap-3">
                <Link href="/agenda" className="btn-primary">Agendar</Link>
                <Link href="/contacto" className="link-secondary">Más información</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Opiniones (misma paleta beige) */}
      <section className="bg-[#F3EBDD] py-14">
        <div className="mx-auto max-w-6xl px-4">
          <header className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
              Opiniones sobre la terapia
            </h2>
            <p className="mt-1 text-sm md:text-base text-gray-700">
              Lo que dicen quienes ya trabajaron conmigo (valoración promedio 4.9/5).
            </p>
          </header>

          {/* Si tu componente acepta props como { source: 'therapy' }, pásalas.
             Si no, dejar <Opiniones /> tal cual (usa sus defaults). */}
          <Opiniones />
          {/* Ejemplo alternativo si soporta props:
              <Opiniones source="therapy" limit={6} /> */}
        </div>
      </section>
    </>
  );
}