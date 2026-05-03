// app/contacto/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import HeroBanner from "@/components/HeroBanner";
import ContactForm from "@/components/contact/ContactForm";
import Link from "next/link";

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
        subtitle="Agenda tu sesión o envíame un mensaje. Atención en línea y presencial en Monterrey."
        accentText="Respondo rápido"
        accentSub="Escríbeme y te respondo cuanto antes. Sin compromisos."
      />

      {/* CTA rápido */}
      <section className="border-b border-black/8 py-10" style={{ background: "#F8F5F0" }}>
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-sm text-zinc-600 leading-relaxed mb-6">
            Si quieres comenzar terapia o resolver una duda rápida, aquí tienes
            dos opciones: agenda directamente o mándame un mensaje y te respondo
            cuanto antes.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/agenda"
              className="rounded-full bg-zinc-900 text-white text-sm px-5 py-2.5 hover:bg-zinc-700 transition-colors"
            >
              Ir a la agenda
            </Link>
            <a
              href="mailto:danielreyna@danielreyna.com"
              className="rounded-full border border-black/8 text-zinc-600 text-sm px-5 py-2.5 hover:bg-black/5 transition-colors"
            >
              Escribirme por correo
            </a>
          </div>
        </div>
      </section>

      {/* Formulario + datos */}
      <section className="py-12">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 md:grid-cols-2">

          {/* Formulario */}
          <div className="rounded-2xl border border-black/8 bg-white p-6">
            <h2 className="text-sm font-medium text-zinc-900 mb-1">Formulario de contacto</h2>
            <p className="text-sm text-zinc-500 mb-6">
              Completa tus datos y se abrirá tu correo con el mensaje listo para enviar.
            </p>
            <Suspense fallback={<p className="text-sm text-zinc-400">Cargando formulario…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Datos + FAQ */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-black/8 bg-white p-6">
              <h3 className="text-sm font-medium text-zinc-900 mb-4">Datos de contacto</h3>
              <ul className="space-y-3 text-sm text-zinc-500">
                <li>
                  <span className="text-zinc-700 font-medium">Correo:</span>{" "}
                  <a
                    href="mailto:danielreyna@danielreyna.com"
                    className="text-emerald-700 hover:underline"
                  >
                    danielreyna@danielreyna.com
                  </a>
                </li>
                <li>
                  <span className="text-zinc-700 font-medium">Ubicación:</span>{" "}
                  Monterrey, N.L. — en línea y presencial.
                </li>
                <li className="flex gap-3 pt-1">
                  <Link href="/servicios" className="text-emerald-700 hover:underline">
                    Ver servicios
                  </Link>
                  <span>·</span>
                  <Link href="/agenda" className="text-emerald-700 hover:underline">
                    Ver disponibilidad
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-black/8 bg-white p-6">
              <h3 className="text-sm font-medium text-zinc-900 mb-4">Preguntas frecuentes</h3>
              <div className="space-y-3 text-sm">
                <details className="group">
                  <summary className="cursor-pointer select-none text-zinc-700 font-medium">
                    ¿Las sesiones son en línea o presencial?
                  </summary>
                  <p className="mt-2 text-zinc-500 leading-relaxed">
                    Trabajo en ambas modalidades. Presencial en Monterrey y en línea por videollamada.
                  </p>
                </details>
                <details className="group border-t border-black/8 pt-3">
                  <summary className="cursor-pointer select-none text-zinc-700 font-medium">
                    ¿Cómo funciona el pago?
                  </summary>
                  <p className="mt-2 text-zinc-500 leading-relaxed">
                    Puedes pagar al agendar o después de confirmar la cita. Te compartiré los detalles por correo.
                  </p>
                </details>
                <details className="group border-t border-black/8 pt-3">
                  <summary className="cursor-pointer select-none text-zinc-700 font-medium">
                    ¿Se puede reagendar o cancelar?
                  </summary>
                  <p className="mt-2 text-zinc-500 leading-relaxed">
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