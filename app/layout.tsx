// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

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

        {/* Newsletter solo en / y /blog */}
        <NewsletterSection />

        <Footer />
      </body>
    </html>
  );
}
