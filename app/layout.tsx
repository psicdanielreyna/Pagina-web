// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import NewsletterForm from "@/components/newsletter-form";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-almond text-evergreen antialiased">
        {/* Header con hamburguesa */}
        <SiteHeader />

        {/* Contenido */}
        <main className="min-h-[60vh]">{children}</main>

        {/* --- Bloque Newsletter (único) --- */}
        <section className="bg-almond/70">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="rounded-xl border bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-center text-2xl font-semibold tracking-tight">
                Suscríbete al newsletter
              </h2>
              <p className="mt-2 text-center text-sm text-emerald-900/70">
                Consejos breves y prácticos para sentirte mejor. <br className="hidden sm:block" />
                Sin spam.
              </p>

              <div className="mt-6">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
            {/* Marca */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Daniel Reyna — Psicólogo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="font-semibold">Daniel Reyna — Psicólogo</span>
              </div>
              <p className="text-sm text-emerald-900/70">
                Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.
              </p>
              <div className="flex items-center gap-3 text-emerald-900/70">
                <a href="https://instagram.com/psic.danielreyna" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
                <a href="https://facebook.com/psic.danielreyna" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
                <a href="https://youtube.com/@Psicdanielreyna" target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>
                <a href="https://x.com/psicdanreyna" target="_blank" rel="noreferrer" aria-label="X">X</a>
              </div>
            </div>

            {/* Navegación */}
            <div>
              <h3 className="mb-3 font-semibold">Navegación</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:underline">Blog</Link></li>
                <li><Link href="/servicios" className="hover:underline">Servicios</Link></li>
                <li><Link href="/sobre-mi" className="hover:underline">Sobre mí</Link></li>
                <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="mb-3 font-semibold">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li><a className="hover:underline" href="mailto:hola@danielreyna.mx">hola@danielreyna.mx</a></li>
                <li>Monterrey, N.L. · México</li>
                <li>Atención en línea</li>
              </ul>
            </div>
          </div>

          <div className="border-t">
            <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col items-center justify-between gap-3 text-xs text-emerald-900/60 md:flex-row">
              <p>© {new Date().getFullYear()} Daniel Reyna. Todos los derechos reservados.</p>
              <div className="flex items-center gap-4">
                <Link href="/aviso" className="hover:underline">Aviso de privacidad</Link>
                <Link href="/terminos" className="hover:underline">Términos y condiciones</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
