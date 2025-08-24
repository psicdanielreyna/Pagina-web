// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { Menu, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export default function SiteHeader() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Izquierda: botón del menú */}
        <Sheet>
          <SheetTrigger
            aria-label="Abrir menú"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          >
            <Menu className="size-6" />
          </SheetTrigger>

          {/* Panel lateral: SIN marca duplicada */}
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-5 py-4">
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <nav className="px-5 pb-5 pt-2">
              <ul className="space-y-3 text-lg">
                <li>
                  <SheetClose asChild>
                    <Link href="/" className="block hover:underline">
                      Inicio
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/servicios" className="block hover:underline">
                      Servicios
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/tienda" className="block hover:underline">
                      Tienda
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/blog" className="block hover:underline">
                      Blog
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/sobre-mi" className="block hover:underline">
                      Sobre mí
                    </Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link
                      href="/agendar"
                      className="block rounded-md bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
                    >
                      Agenda
                    </Link>
                  </SheetClose>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Centro: ÚNICA marca visible */}
        <Link
          href="/"
          className="pointer-events-auto absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-gray-900"
        >
          Daniel Reyna — Psicólogo
        </Link>

        {/* Derecha: redes */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.instagram.com/psic.danielreyna/"
            aria-label="Instagram"
            className="hover:text-gray-700"
          >
            <Instagram className="size-5" />
          </Link>
          <Link
            href="https://www.facebook.com/psic.danielreyna/"
            aria-label="Facebook"
            className="hover:text-gray-700"
          >
            <Facebook className="size-5" />
          </Link>
          <Link
            href="https://www.youtube.com/@PsicDanielReyna"
            aria-label="YouTube"
            className="hover:text-gray-700"
          >
            <Youtube className="size-5" />
          </Link>
          <Link
            href="https://x.com/psicdanreyna"
            aria-label="X (Twitter)"
            className="hover:text-gray-700"
          >
            <Twitter className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
