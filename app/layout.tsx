// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
  // ✅ Next 13+ ya detecta app/icon.png automáticamente
  icons: {
    icon: "/favicon.ico", // fallback
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", // lo usaremos para iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Compatibilidad extra (opcional) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-white text-neutral-900`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
