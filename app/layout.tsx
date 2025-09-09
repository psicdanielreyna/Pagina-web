// app/layout.tsx

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import SiteHeader from "@/components/SiteHeader"
import Footer from "@/components/Footer"
import NewsletterForm from "@/components/newsletter-form"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SiteHeader />
        <main>{children}</main>

        {/* Newsletter destacado al fondo */}
        <section className="bg-[#f6e9d9] py-12 px-6">
          <div className="max-w-3xl mx-auto rounded-lg bg-white shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Suscríbete al newsletter</h2>
            <p className="text-gray-600 mb-6">
              Consejos breves y prácticos para sentirte mejor. ✨ <br />
              Sin spam.
            </p>
            <NewsletterForm />
          </div>
        </section>

        <Footer />
      </body>
    </html>
  )
}
