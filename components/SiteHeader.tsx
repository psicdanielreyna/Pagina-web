// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { Menu, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Botón menú (izquierda) */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Abrir menú"
              className="inline-flex items-center justify-center rounded-md p-2 outline-none ring-0 hover:bg-gray-100"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-5 py-4">
              <SheetTitle className="text-left">
                Daniel Reyna — Psicólogo
              </SheetTitle>
            </SheetHeader>

            <nav className="px-5 py-2 space-y-2">
              <Link className="block py-2 text-lg" href="/">Inicio</Link>
              <Link className="block py-2 text-lg" href="/servicios">Servicios</Link>
              <Link className="block py-2 text-lg" href="/tienda">Tienda</Link>
              <Link className="block py-2 text-lg" href="/blog">Blog</Link>
              <Link className="block py-2 text-lg" href="/sobre-mi">Sobre mí</Link>
              <Button asChild className="mt-2 w-full">
                <Link href="/agendar">Agenda</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Título del sitio (centro, solo md+) */}
        <Link
          href="/"
          className="hidden md:block font-semibold tracking-tight text-[15px]"
        >
          Daniel Reyna — Psicólogo
        </Link>

        {/* Redes (derecha) */}
        <div className="flex items-center gap-4">
          <Link href="https://www.instagram.com/psic.danielreyna/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Instagram className="size-5" />
          </Link>
          <Link href="https://www.facebook.com/psic.danielreyna/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Facebook className="size-5" />
          </Link>
          <Link href="https://www.youtube.com/@PsicDanielReyna" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <Youtube className="size-5" />
          </Link>
          <Link href="https://x.com/psicdanreyna" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
            <Twitter className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
