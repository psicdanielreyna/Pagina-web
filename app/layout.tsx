// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader"; // <- importante: default export
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter"; // o "@/components/NewsletterCard" si así se llama

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Psicología clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />

        <main className="min-h-[60vh]">{children}</main>

        {/* Newsletter global (una sola vez, antes del footer) */}
        <section className="container mx-auto max-w-5xl px-4 md:px-6 my-16">
          <Newsletter />
        </section>

        <Footer />
      </body>
    </html>
  );
}
