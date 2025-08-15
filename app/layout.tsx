// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"

// ⬇️ Si tienes Header y Footer como componentes,
// déjalos así (ambos export default). Ajusta si en tu repo son named exports.
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicoterapia & Recursos",
  description:
    "Psicoterapia individual y de pareja. Recursos prácticos para ansiedad, autoestima y bienestar.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      {/* Usamos tipografía del sistema para evitar llamadas a Google Fonts */}
      <body className="min-h-screen bg-white text-neutral-900 antialiased font-sans">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
