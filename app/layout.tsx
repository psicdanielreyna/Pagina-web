// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Terapia clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Header global */}
        <SiteHeader />

        {/* Contenido principal */}
        <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:py-12">
          {children}
        </main>

        {/* (Opcional) Footer simple */}
        {/* <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Daniel Reyna
        </footer> */}
      </body>
    </html>
  );
}