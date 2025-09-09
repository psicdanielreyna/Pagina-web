// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SiteHeader />

        <main className="min-h-screen">{children}</main>

        {/* Bloque Newsletter */}
        <section className="bg-[#f6e9d9] py-12">
          <div className="container mx-auto max-w-3xl text-center px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Suscríbete al newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Consejos breves y prácticos para sentirte mejor. <br /> 
              Sin spam ✨
            </p>
            <NewsletterForm />
          </div>
        </section>

        <Footer />
      </body>
    </html>
  );
}
