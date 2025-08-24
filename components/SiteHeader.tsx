"use client";

import Link from "next/link";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose,
} from "@/components/ui/sheet";
import { Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/tienda", label: "Tienda" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/agendar", label: "Agenda", primary: true },
];

const socials = [
  { href: "https://www.instagram.com/psic.danielreyna/", Icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/psic.danielreyna/", Icon: Facebook, label: "Facebook" },
  { href: "https://www.youtube.com/@PsicDanielReyna", Icon: Youtube, label: "YouTube" },
  { href: "https://x.com/psicdanreyna", Icon: Twitter, label: "X" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 sm:px-6">
        {/* Columna izquierda: menú */}
        <div className="flex w-10 shrink-0 items-center justify-start">
          <Sheet>
            <SheetTrigger aria-label="Abrir menú" className="rounded-md p-2 hover:bg-black/5">
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="px-5 py-4">
                <SheetTitle className="text-left">
                  <Link href="/" className="block">
                    <span className="font-semibold">Daniel Reyna</span>{" "}
                    <span className="text-muted-foreground">— Psicólogo</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4 pb-4">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        item.primary
                          ? "mt-2 inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-white hover:bg-emerald-700"
                          : "rounded-md px-3 py-2 text-[15px] hover:bg-black/5"
                      }
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}

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
                className="absolute right-3 top-3 rounded-md p-2 hover:bg-black/5"
              >
                <X className="size-5" />
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        {/* Columna centro: marca (ocupa y centra) */}
        <div className="flex flex-1 items-center justify-center">
          <Link href="/" className="text-sm font-medium leading-none sm:text-base">
            <span className="font-semibold">Daniel Reyna</span>{" "}
            <span className="text-muted-foreground">— Psicólogo</span>
          </Link>
        </div>

        {/* Columna derecha: redes */}
        <div className="flex w-10 shrink-0 items-center justify-end gap-1 sm:w-auto sm:gap-2">
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
