import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SiteHeader />
        <main className="min-h-[calc(100dvh-56px)]">{children}</main>
      </body>
    </html>
  );
}