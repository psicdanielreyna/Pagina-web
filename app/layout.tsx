// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Terapia clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
  metadataBase:
    new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://danielreyna.netlify.app"),
  openGraph: {
    title: "Daniel Reyna — Psicólogo",
    description:
      "Terapia clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
    url: "/",
    siteName: "Daniel Reyna — Psicólogo",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    locale: "es_MX",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <SiteHeader />
        <main className="min-h-[calc(100dvh-64px)]">{children}</main>
        {/* Si más adelante agregas footer, colócalo aquí */}
      </body>
    </html>
  );
}