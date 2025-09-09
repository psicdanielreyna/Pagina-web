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
        {/* Favicon fallbacks */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
       dangerouslySetInnerHTML={{
          __html: `
        (function() {
          try {
            var t = localStorage.getItem('theme');
            if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
            if (t === 'dark') document.documentElement.classList.add('dark');
          } catch(e) {}
        })();
    `,
    }}
  />
</head>
      </head>
      <body className={`${inter.className} bg-almond text-evergreen`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
