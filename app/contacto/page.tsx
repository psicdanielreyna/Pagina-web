// app/contacto/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto o agenda una sesión. Atención en línea y presencial (Monterrey).",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <HeroBanner
        badge="Contacto"
        title="Hablemos y da el primer paso"
        subtitle="Agenda tu sesión o envíame un mensaje. Atención en línea y presencial (Monterrey)."
        imageUrl="hero-contacto.jpg" // coloca esta imagen en /public/img
      />

      {/* Intro + CTA */}
      <section className="bg-[#EFDDCB] py-10">
        <div className="mx-auto w-full max-w-5xl px-4">
          <p className="text-center text-base md:text-lg text-gray-800">
            Si quieres comenzar terapia o resolver una duda rápida, aquí tienes
            dos opciones: agenda directamente o mándame un mensaje y te respondo
            cuanto antes.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/agenda"
              className="inline-flex items-center justify-center rounded-md bg-green-700 px-4 py-2 text-white shadow hover:bg-green-800"
            >
              Ir a la agenda
            </a>
            <a
              href="mailto:danielreyna@danielreyna.com"
              className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-green-800 hover:bg-white"
            >
              Escribirme por correo
            </a>
          </div>
        </div>
      </section>

      {/* Contenido principal: Form + Datos */}
      <section className="py-12">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 px-4 md:grid-cols-2">
          {/* Formulario */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-xl font-semibold">Formulario de contacto</h2>
            <p className="mb-6 text-sm text-gray-600">
              Completa tus datos y se abrirá tu correo con el mensaje listo para enviar.
            </p>
            <Suspense fallback={<p className="text-sm text-gray-600">Cargando formulario…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Datos / FAQ */}
          <div className="space-y-8">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Datos de contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium">Correo:</span>{" "}
                  <a
                    className="text-green-800 hover:underline"
                    href="mailto:danielreyna@danielreyna.com"
                  >
                    danielreyna@danielreyna.com
                  </a>
                </li>
                <li>
                  <span className="font-medium">Ubicación:</span> Monterrey, N.L. — Atención en
                  línea y presencial.
                </li>
                <li className="flex gap-3">
                  <a className="text-green-800 hover:underline" href="/servicios">
                    Ver servicios
                  </a>
                  <span>·</span>
                  <a className="text-green-800 hover:underline" href="/agenda">
                    Ver disponibilidad
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Preguntas frecuentes</h3>
              <div className="space-y-4 text-sm">
                <details className="group">
                  <summary className="cursor-pointer select-none font-medium">
                    ¿Las sesiones son en línea o presencial?
                  </summary>
                  <p className="mt-2 text-gray-700">
                    Trabajo en ambas modalidades. Presencial en Monterrey y en línea por videollamada.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer select-none font-medium">
                    ¿Cómo funciona el pago?
                  </summary>
                  <p className="mt-2 text-gray-700">
                    Puedes pagar al agendar o después de confirmar la cita. Te compartiré los detalles por correo.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer select-none font-medium">
                    ¿Se puede reagendar o cancelar?
                  </summary>
                  <p className="mt-2 text-gray-700">
                    Sí, con al menos 24 horas de anticipación para liberar el espacio y reprogramar.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}