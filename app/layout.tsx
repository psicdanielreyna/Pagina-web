import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata: Metadata = {
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

        {/* separador + respiro para el newsletter */}
        <section className="mt-16 md:mt-24 border-t border-emerald-100 bg-emerald-50/30">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <NewsletterSection />
          </div>
        </section>

        <Footer />
      </body>
    </html>
  );
}
