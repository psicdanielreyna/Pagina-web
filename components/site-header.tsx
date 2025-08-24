// components/site-header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Menú lateral (hamburger) */}
        <Sheet>
          <SheetTrigger aria-label="Abrir menú" className="p-2 -ml-2 rounded hover:bg-gray-100">
            {/* icono hamburguesa */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Image src="/logo.png" alt="Daniel Reyna" width={28} height={28} className="rounded-full" />
                Daniel Reyna — Psicólogo
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 grid gap-2 text-lg">
              <Link href="/" className="rounded px-2 py-2 hover:bg-gray-100">Inicio</Link>
              <Link href="/servicios" className="rounded px-2 py-2 hover:bg-gray-100">Servicios</Link>
              <Link href="/tienda" className="rounded px-2 py-2 hover:bg-gray-100">Tienda</Link>
              <Link href="/blog" className="rounded px-2 py-2 hover:bg-gray-100">Blog</Link>
              <Link href="/sobre-mi" className="rounded px-2 py-2 hover:bg-gray-100">Sobre mí</Link>
              <Link href="/agendar" className="rounded px-2 py-2 font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                Agenda
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo / Marca (centro en mobile, izquierda en desktop) */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Daniel Reyna" width={36} height={36} className="rounded-full" />
          <span className="hidden sm:block font-semibold">Daniel Reyna — Psicólogo</span>
        </Link>

        {/* Iconos sociales (derecha) */}
        <div className="flex items-center gap-3">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-gray-100">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded hover:bg-gray-100">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.2 0 12 0 12s0 3.8.5 5.8a3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="p-2 rounded hover:bg-gray-100">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16 3c.7 1.6 2 3 3.6 3.7v3A8.5 8.5 0 0 1 16 9.2V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1V12a2.5 2.5 0 1 0 1.5 2.3V2h3.5z"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
