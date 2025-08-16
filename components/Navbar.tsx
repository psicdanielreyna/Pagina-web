// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Nombre */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Daniel Reyna — Psicólogo
        </Link>

        {/* Menú de navegación */}
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/servicios" className="hover:text-blue-600">
            Servicios
          </Link>
          <Link href="/tienda" className="hover:text-blue-600">
            Tienda
          </Link>
          <Link href="/blog" className="hover:text-blue-600">
            Blog
          </Link>
          <Link href="/agendar" className="hover:text-blue-600">
            Agendar
          </Link>
        </nav>
      </div>
    </header>
  );
}
