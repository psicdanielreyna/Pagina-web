"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" aria-label="Ir al inicio" className="inline-flex">
          <Image
            src="/logo.png"
            alt="Daniel Reyna — Psicólogo"
            width={180}
            height={52}
            priority
          />
        </Link>

        {/* Botón menú hamburguesa */}
        <button
          className="p-2 text-gray-700 hover:text-emerald-800 transition md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Menú Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800">
          <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
          <Link href="/servicios" className="hover:text-emerald-700">Servicios</Link>
          <Link href="/talleres" className="hover:text-emerald-700">Talleres</Link>
          <Link href="/sobre-mi" className="hover:text-emerald-700">Sobre mí</Link>
          <Link href="/newsletter" className="hover:text-emerald-700">Newsletter</Link>
          <Link href="/contacto" className="hover:text-emerald-700">Contacto</Link>
        </nav>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 text-lg text-gray-800 font-medium">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 p-2"
            aria-label="Cerrar menú"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link href="/talleres" onClick={() => setOpen(false)}>Talleres</Link>
          <Link href="/sobre-mi" onClick={() => setOpen(false)}>Sobre mí</Link>
          <Link href="/newsletter" onClick={() => setOpen(false)}>Newsletter</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
        </div>
      )}
    </header>
  );
}