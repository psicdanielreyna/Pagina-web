// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://danielreyna.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Daniel Reyna — Psicólogo | Terapia Online y Presencial",
    template: "%s | Daniel Reyna Psicólogo",
  },
  description:
    "Psicólogo clínico especializado en ansiedad, depresión, duelo, estrés y autoestima. Sesiones online y presenciales.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: baseUrl,
    siteName: "Daniel Reyna Psicólogo",
    title: "Daniel Reyna — Psicólogo",
    description:
      "Terapia psicológica profesional en Monterrey y en línea. Especialista en ansiedad, depresión, duelo, estrés y autoestima.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Daniel Reyna Psicólogo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Reyna — Psicólogo",
    description:
      "Psicólogo clínico especializado en ansiedad, depresión, duelo, estrés y autoestima.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Acompañamiento psicológico con herramientas claras y efectivas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* JSON-LD Schema.org */}
        <script
          type="application/ld+json"
          // si no usas redes, borra sameAs
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Psychologist",
              name: "Daniel Reyna",
              url: baseUrl,
              image: `${baseUrl}/og-image.jpg`,
              description:
                "Psicólogo clínico especializado en ansiedad, depresión, duelo, estrés y autoestima. Sesiones online y presenciales.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Monterrey",
                addressRegion: "Nuevo León",
                addressCountry: "MX",
              },
              sameAs: [
                // pon aquí tus redes si quieres
                // "https://www.instagram.com/psic.danielreyna",
                // "https://www.facebook.com/tuusuario"
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
