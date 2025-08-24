// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "Daniel Reyna — Psicólogo";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://danielreyna.netlify.app";
const DEFAULT_OG = "/og-default.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | " + SITE_NAME,
  },
  description:
    "Terapia psicológica profesional. Lecturas breves y aplicables para sentirte mejor.",
  keywords: [
    "psicólogo",
    "terapia",
    "salud mental",
    "autoayuda",
    "psicoterapia",
    "Monterrey",
  ],
  authors: [{ name: "Daniel Reyna" }],
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_NAME,
    siteName: SITE_NAME,
    description:
      "Terapia psicológica profesional con enfoque práctico. Artículos y recursos útiles.",
    locale: "es_MX",
    images: [
      {
        url: DEFAULT_OG, // en /public/og-default.jpg
        width: 1200,
        height: 630,
        alt: "Daniel Reyna — Psicólogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Terapia psicológica profesional. Lecturas breves y aplicables para sentirte mejor.",
    images: [DEFAULT_OG],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  themeColor: "#0EA5A3",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
