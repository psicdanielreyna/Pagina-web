// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#043222" }],
  },
  themeColor: "#F6E9D9",
  manifest: "/site.webmanifest", // opcional: elimínalo si no lo usas
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-almond text-evergreen antialiased">
        <SiteHeader />

        <main className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          {children}
        </main>

        {/* Newsletter grande antes del footer */}
        <section
          aria-labelledby="newsletter-title"
          className="mx-auto my-12 w-full max-w-5xl rounded-2xl border bg-white p-6 shadow-sm md:my-16 md:p-8"
        >
          <h2
            id="newsletter-title"
            className="mb-2 text-center text-2xl font-semibold md:text-3xl"
          >
            Suscríbete al newsletter
          </h2>
          <p className="mb-6 text-center text-sm text-gray-600 md:text-base">
            Consejos breves y prácticos para sentirte mejor. <span className="whitespace-nowrap">Sin spam.</span>
          </p>

          <div className="mx-auto max-w-3xl">
            <NewsletterForm />
          </div>
        </section>

        <Footer />
      </body>
    </html>
  );
}
