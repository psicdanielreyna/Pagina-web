// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Analytics from "./analytics";
import TrackCTAs from "@/components/TrackCTAs"; // si lo tienes
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielreyna.com"),
  title: {
    default: "Daniel Reyna - Psicólogo | Psicólogo en Monterrey",
    template: "%s | Daniel Reyna - Psicólogo",
  },
  description: "Terapia cognitivo-conductual, recursos y blog de psicología.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: "https://danielreyna.com",
    siteName: "Daniel Reyna – Psicólogo",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Daniel Reyna – Psicólogo" }],
  },
  twitter: { card: "summary_large_image", title: "Daniel Reyna – Psicólogo", images: ["/og/home.jpg"] },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        {/* <- Requisito de Next: envolver cualquier uso de useSearchParams en Suspense */}
        <Suspense fallback={null}>
          <Analytics />
          <TrackCTAs />
        </Suspense>
      </body>
    </html>
  );
}