// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { usePathname } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description:
    "Psicología clara y práctica. Herramientas simples que puedes aplicar en tu día a día.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Solo mostrar newsletter en home y en /blog
  const showNewsletter =
    pathname === "/" || pathname.startsWith("/blog");

  return (
    <html lang="es">
      <body>
        <SiteHeader />

        <main className="min-h-[60vh]">{children}</main>

        {showNewsletter && (
          <section className="flex justify-center my-16">
            <div className="w-full max-w-lg px-4 md:px-6">
              <Newsletter />
            </div>
          </section>
        )}

        <Footer />
      </body>
    </html>
  );
}
