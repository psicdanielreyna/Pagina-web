// components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          Daniel Reyna — Psicólogo
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/tienda" className="hover:underline">Tienda</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/sobre-mi" className="hover:underline">Sobre mí</Link>
          <Link
            href="/agenda"
            className="inline-flex items-center rounded-full px-4 py-2 bg-emerald-700 text-white hover:bg-emerald-800 transition"
          >
            Agenda
          </Link>
        </nav>
      </div>
    </header>
  );
}
