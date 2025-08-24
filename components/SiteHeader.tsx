// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/tienda", label: "Tienda" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/agendar", label: "Agenda", variant: "primary" as const },
];

const socials = [
  { href: "https://www.instagram.com/psic.danielreyna/", Icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/psic.danielreyna/", Icon: Facebook, label: "Facebook" },
  { href: "https://www.youtube.com/@PsicDanielReyna", Icon: Youtube, label: "YouTube" },
  { href: "https://x.com/psicdanreyna", Icon: Twitter, label: "X (Twitter)" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
        {/* Menú hamburguesa */}
        <Sheet>
          <SheetTrigger
            aria-label="Abrir menú"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5"
          >
            <Menu className="size-6" />
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-5 py-4">
              <SheetTitle className="text-left leading-tight">
                <Link href="/" className="block">
                  <span className="font-semibold">Daniel Reyna</span>{" "}
                  <span className="text-muted-foreground">— Psicólogo</span>
                </Link>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-4 pb-4">
              {nav.map(({ href, label, variant }) =>
                variant === "primary" ? (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-white hover:bg-emerald-700"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ) : (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="rounded-md px-3 py-2 text-[15px] hover:bg-black/5"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                )
              )}
              <div className="mt-4 border-t pt-3">
                <p className="px-3 pb-2 text-sm text-muted-foreground">Sígueme</p>
                <div className="flex items-center gap-2 px-3 pb-4">
                  {socials.map(({ href, Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-9 items-center justify-center rounded-md hover:bg-black/5"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            <SheetClose
              aria-label="Cerrar menú"
              className="absolute right-3 top-3 inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5"
            >
              <X className="size-5" />
            </SheetClose>
          </SheetContent>
        </Sheet>

        {/* Marca centrada */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-sm font-medium leading-none sm:text-base"
        >
          <span className="font-semibold">Daniel Reyna</span>{" "}
          <span className="text-muted-foreground">— Psicólogo</span>
        </Link>

        {/* Redes a la derecha */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex size-9 items-center justify-center rounded-md hover:bg-black/5"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
