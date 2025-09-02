"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, Instagram, Facebook, Youtube, CircleEllipsis as XLogo } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* IZQUIERDA: Hamburguesa */}
        <div className="mr-2 flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Abrir menú"
                className="p-2 rounded-md hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-80 sm:w-96 p-0 bg-white"
              aria-describedby={undefined}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <SheetTitle className="text-lg font-semibold">Menú</SheetTitle>
                <SheetClose asChild>
                  <button
                    aria-label="Cerrar menú"
                    className="p-2 rounded-md hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-1 px-4 py-3">
                <Link
                  href="/blog"
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                  onClick={() => setOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/servicios"
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                  onClick={() => setOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  href="/sobre-mi"
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                  onClick={() => setOpen(false)}
                >
                  Sobre mí
                </Link>
                <Link
                  href="/contacto"
                  className="rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                  onClick={() => setOpen(false)}
                >
                  Contacto
                </Link>
              </nav>

              <div className="px-4 py-3 border-t">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Sígueme</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://instagram.com/psic.danielreyna"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/60"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/psic.danielreyna"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/60"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </a>
                  <a
                    href="https://youtube.com/@Psicdanielreyna"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/60"
                  >
                    <Youtube className="h-4 w-4" />
                    YouTube
                  </a>
                  <a
                    href="https://x.com/psicdanielreyna"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted/60"
                  >
                    <XLogo className="h-4 w-4" />
                    X
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* CENTRO: LOGO (más grande) */}
        <div className="relative mx-auto select-none">
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="block"
          >
            <Image
              src="/logo.png"
              alt="Daniel Reyna - Psicólogo"
              width={220}     // ← agrandado
              height={44}
              priority
              className="mx-auto h-10 sm:h-[44px] w-auto object-contain"
            />
          </Link>
        </div>

        {/* DERECHA: Redes (íconos) */}
        <div className="ml-auto flex items-center gap-4 pr-1">
          <a
            href="https://instagram.com/psic.danielreyna"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-muted/60"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/psic.danielreyna"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-muted/60"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/@Psicdanielreyna"
            aria-label="YouTube"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-muted/60"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/psicdanielreyna"
            aria-label="X"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-muted/60"
          >
            <XLogo className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}