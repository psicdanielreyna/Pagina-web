// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/newsletter-form";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-almond text-evergreen antialiased`}>
        {/* Header con hamburguesa */}
        <SiteHeader />

        {/* Contenido principal */}
        <main className="container mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        {/* Newsletter (una sola vez, antes del footer) */}
        <section className="border-y bg-almond/60">
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <NewsletterForm />
          </div>
        </section>

        {/* Footer con íconos de redes */}
        <Footer />
      </body>
    </html>
  );
}
