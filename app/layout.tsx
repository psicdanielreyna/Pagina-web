// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// URL base del sitio (cámbiala cuando tengas dominio propio)
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://danielreyna.netlify.app";

// SEO / Metadata principal
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Reyna Psicólogo",
      },
    ],
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

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
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
                // agrega tus redes si quieres:
                // "https://www.instagram.com/tu_usuario",
                // "https://www.facebook.com/tu_usuario"
              ],
            }),
          }}
        />

        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
