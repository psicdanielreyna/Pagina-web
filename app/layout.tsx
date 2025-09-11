// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata = {
  metadataBase: new URL("https://danielreyna.com"),
  title: {
    default: "Daniel Reyna – Psicólogo",
    template: "%s | Daniel Reyna – Psicólogo",
  },
  description: "Terapia cognitivo-conductual, recursos y blog de psicología.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://danielreyna.com",
    siteName: "Daniel Reyna – Psicólogo",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>

        {/* Newsletter solo en / y /blog */}
        <NewsletterSection />

        <Footer />
      </body>
    </html>
  );
}
