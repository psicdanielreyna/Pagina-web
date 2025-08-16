// components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div className="space-y-2">
            <Link href="/" className="text-lg font-semibold">
              Daniel Reyna — Psicólogo
            </Link>
            <p className="text-sm text-neutral-600">
              Acompañamiento con herramientas claras y humanas.
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-2">
            <Link href="/servicios" className="text-neutral-700 hover:text-neutral-900">
              Servicios
            </Link>
            <Link href="/tienda" className="text-neutral-700 hover:text-neutral-900">
              Tienda
            </Link>
            <Link href="/blog" className="text-neutral-700 hover:text-neutral-900">
              Blog
            </Link>
            <Link href="/sobre-mi" className="text-neutral-700 hover:text-neutral-900">
              Sobre mí
            </Link>
            <Link href="/agenda" className="text-neutral-700 hover:text-neutral-900">
              Agenda
            </Link>
            <Link href="/privacidad" className="text-neutral-700 hover:text-neutral-900">
              Privacidad
            </Link>
          </nav>

          {/* Nota/legal */}
          <div className="text-sm text-neutral-600 md:text-right">
            <p>© {year} Daniel Reyna. Todos los derechos reservados.</p>
            <p className="mt-1">
              Monterrey, Nuevo León · Atención en línea y presencial.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
