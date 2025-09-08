// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Importante: evita el warning de metadataBase en build
  metadataBase: new URL("https://danielreyna.com"),
  title: {
    default: "Daniel Reyna — Psicólogo",
    template: "%s | Daniel Reyna",
  },
  description: "Terapia clara y práctica para sentirte mejor.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://danielreyna.com",
    siteName: "Daniel Reyna",
    title: "Daniel Reyna — Psicólogo",
    description: "Terapia clara y práctica para sentirte mejor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Reyna — Psicólogo",
    description: "Terapia clara y práctica para sentirte mejor.",
  },
};

// (opcional) para controlar theme-color en móviles
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Fallbacks del favicon (extra a los de `icons`) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Redirige tokens de Netlify Identity al panel de Decap (/admin) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var h = (typeof window !== 'undefined') ? window.location.hash : '';
    if (/#(invite_token|confirmation_token|recovery_token)=/.test(h)) {
      window.location.replace('/admin/' + h);
    }
  } catch (e) { /* no-op */ }
})();
`,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white text-neutral-900`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}