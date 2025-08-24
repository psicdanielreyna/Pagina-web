// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader"; // 👈 tu header con el menú lateral
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
  openGraph: {
    title: "Daniel Reyna — Psicólogo",
    description: "Terapia clara y práctica para sentirte mejor.",
    url: "https://danielreyna.netlify.app",
    siteName: "Daniel Reyna Psicólogo",
    images: [
      {
        url: "/og-default.jpg", // 👈 aquí la que agregaste
        width: 1200,
        height: 630,
        alt: "Daniel Reyna Psicólogo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={cn("min-h-screen bg-white text-gray-900", inter.className)}>
        
        {/* HEADER ARRIBA */}
        <SiteHeader />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1">{children}</main>
        
      </body>
    </html>
  );
}
