import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <SiteHeader />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}