import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Header */}
        <SiteHeader />

        {/* Contenido principal */}
        <main className="flex-1">{children}</main>

        {/* Newsletter */}
        <section className="bg-white rounded-xl shadow-sm p-6 max-w-lg mx-auto mb-10 text-center">
          <h3 className="text-lg font-semibold text-evergreen mb-2">
            Suscríbete al newsletter
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Consejos breves y prácticos para sentirte mejor. Sin spam ✨
          </p>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex flex-col sm:flex-row gap-2 justify-center"
          >
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              className="w-full sm:w-auto flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-evergreen"
            />
            <button
              type="submit"
              className="bg-evergreen text-white rounded-lg px-4 py-2 hover:bg-emerald-800 transition w-full sm:w-auto"
            >
              Suscribirme
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            Suscripción exitosa, ¡Bienvenid@!
          </p>
        </section>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
