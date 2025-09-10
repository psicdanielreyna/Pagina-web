// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter"; // 👈 aquí

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />

        <main className="min-h-[60vh]">{children}</main>

        {/* Newsletter global (una sola vez) */}
        <section className="container mx-auto max-w-5xl px-4 md:px-6 my-16">
          <Newsletter />
        </section>

        <Footer />
      </body>
    </html>
  );
}
