// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader"; // ⬅️ usa SOLO este

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Terapia clara y práctica para sentirte mejor. Herramientas simples que puedes aplicar en tu día a día.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 sm:px-6">{children}</main>
      </body>
    </html>
  );
}