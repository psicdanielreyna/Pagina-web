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
        (
          <footer className="border-t bg-white">
            <div className="container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Logo y descripción */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src="/logo.png" alt="Daniel Reyna – Psicólogo" className="h-8 w-auto" />
                </div>
                <p className="text-sm text-gray-600">
                  Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.
                </p>
                <div className="flex gap-4 mt-4">
                  <Link href="https://instagram.com/psic.danielreyna" target="_blank" aria-label="Instagram">
                    <Instagram className="h-5 w-5 hover:text-emerald-700 transition-colors" />
                  </Link>
                  <Link href="https://facebook.com/psic.danielreyna" target="_blank" aria-label="Facebook">
                    <Facebook className="h-5 w-5 hover:text-emerald-700 transition-colors" />
                  </Link>
                  <Link href="https://youtube.com/@Psicdanielreyna" target="_blank" aria-label="YouTube">
                    <Youtube className="h-5 w-5 hover:text-emerald-700 transition-colors" />
                  </Link>
                  <Link href="https://x.com/psicdanreyna" target="_blank" aria-label="X">
                    <Twitter className="h-5 w-5 hover:text-emerald-700 transition-colors" />
                  </Link>
                </div>
              </div>
      
              {/* Navegación */}
              <div>
                <h3 className="font-semibold mb-3">NAVEGACIÓN</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/blog">Blog</Link></li>
                  <li><Link href="/servicios">Servicios</Link></li>
                  <li><Link href="/sobre-mi">Sobre mí</Link></li>
                  <li><Link href="/contacto">Contacto</Link></li>
                </ul>
              </div>
      
              {/* Contacto */}
              <div>
                <h3 className="font-semibold mb-3">CONTACTO</h3>
                <p className="text-sm text-gray-700">danielreyna@danielreyna.mx</p>
                <p className="text-sm text-gray-700">Monterrey, N.L. · México</p>
                <p className="text-sm text-gray-700">Atención en línea</p>
              </div>
            </div>
      
            <div className="border-t text-center py-4 text-xs text-gray-500">
              © {new Date().getFullYear()} Daniel Reyna. Todos los derechos reservados.
            </div>
          </footer>
        )
      }
      </body>
    </html>
  );
}
