// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna — Psicólogo",
  description: "Terapia clara y práctica para sentirte mejor.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Evita FOUC al decidir el tema antes de pintar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-almond text-evergreen dark:bg-evergreen dark:text-almond`}>
        <SiteHeader />
        {/* si tu SiteHeader ya incluye contenedor/padding, puedes dejar <main> solo con min-h */}
        <main className="min-h-screen container px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
