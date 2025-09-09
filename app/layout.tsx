import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Reyna | Psicólogo",
  description: "Psicología y bienestar: ansiedad, hábitos, relaciones y más.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Previene FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {/* Header */}
        <header className="w-full flex justify-between items-center p-4 border-b border-current">
          <div className="font-bold text-lg">☕ Daniel Reyna</div>
          <div className="flex items-center gap-3">
            {/* Íconos sociales aquí */}
            <ThemeToggle />
          </div>
        </header>

        {/* Contenido principal */}
        <main className="container px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="w-full text-center py-6 border-t border-current text-sm">
          © {new Date().getFullYear()} Daniel Reyna. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
