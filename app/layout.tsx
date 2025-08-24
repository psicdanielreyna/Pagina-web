// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; // o "@/components/Navbar"
import Footer from "@/components/Footer"; // si tienes footer
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
  openGraph: {
    title: "Daniel Reyna — Psicólogo",
    description: "Terapia clara y práctica para sentirte mejor.",
    url: "https://danielreyna.netlify.app",
    siteName: "Daniel Reyna — Psicólogo",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Reyna — Psicólogo",
    description: "Terapia clara y práctica para sentirte mejor.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header /> 
        <main className="pt-6 md:pt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
