"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SiteHeader() {
  return (
    <header className="border-b bg-white/90 backdrop-blur">
      <div className="container relative mx-auto flex h-14 items-center px-4">
        {/* Izquierda: menú hamburguesa */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger
              aria-label="Abrir menú"
              className="p-2 -ml-2 rounded hover:bg-muted/50 transition"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                <Link href="/blog" className="block hover:underline">
                  Blog
                </Link>
                <Link href="/servicios" className="block hover:underline">
                  Servicios
                </Link>
                <Link href="/sobre-mi" className="block hover:underline">
                  Sobre mí
                </Link>
                <Link href="/contacto" className="block hover:underline">
                  Contacto
                </Link>
              </nav>

              <div className="mt-8 border-t pt-4">
                <p className="mb-3 text-sm text-muted-foreground">Sígueme</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://instagram.com/psic.danielreyna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/Psic.danielreyna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                  <a
                    href="https://youtube.com/@Psicdanielreyna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
                  >
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                  <a
                    href="https://x.com/psicdanielreyna"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
                  >
                    <Twitter className="h-4 w-4" />
                    X
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* CENTRO ABSOLUTO: título */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="select-none text-base font-serif font-semibold tracking-tight hover:opacity-80"
          >
            Daniel Reyna — Psicólogo
          </Link>
        </div>

        {/* Derecha: iconos sociales */}
        <div className="ml-auto flex items-center gap-4">
          <a
            href="https://instagram.com/psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded p-1 hover:bg-muted/50"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/Psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rounded p-1 hover:bg-muted/50"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/@Psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="rounded p-1 hover:bg-muted/50"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="rounded p-1 hover:bg-muted/50"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}