// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X as XIcon, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const socials = [
  { name: "Instagram", href: "https://instagram.com/psic.danielreyna", icon: Instagram },
  { name: "Facebook",  href: "https://facebook.com/psic.danielreyna", icon: Facebook },
  { name: "YouTube",   href: "https://youtube.com/@Psicdanielreyna", icon: Youtube },
  { name: "X",         href: "https://x.com/psicdanreyna", icon: Twitter },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 md:h-16 md:px-4">
        {/* Izquierda: hamburguesa */}
        <div className="flex w-10 items-center justify-start md:w-12">
          <Sheet>
            <SheetTrigger
              aria-label="Abrir menú"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/10"
            >
              <MenuIcon className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="left" className="w-[320px] max-w-[85vw] p-0">
              <div className="flex items-center justify-between border-b bg-white px-4 py-3">
                <SheetTitle className="text-base font-medium">Menú</SheetTitle>
                <SheetClose aria-label="Cerrar" className="rounded-md p-2 hover:bg-gray-100">
                  <XIcon className="h-5 w-5" />
                </SheetClose>
              </div>

              <nav className="px-4 py-4">
                <ul className="space-y-3">
                  <li><SheetClose asChild><Link href="/blog" className="block rounded-md px-2 py-2 hover:bg-gray-100">Blog</Link></SheetClose></li>
                  <li><SheetClose asChild><Link href="/servicios" className="block rounded-md px-2 py-2 hover:bg-gray-100">Servicios</Link></SheetClose></li>
                  <li><SheetClose asChild><Link href="/sobre-mi" className="block rounded-md px-2 py-2 hover:bg-gray-100">Sobre mí</Link></SheetClose></li>
                  <li><SheetClose asChild><Link href="/contacto" className="block rounded-md px-2 py-2 hover:bg-gray-100">Contacto</Link></SheetClose></li>
                </ul>

                <div className="mt-6 border-t pt-4">
                  <p className="mb-3 text-sm text-gray-500">Sígueme</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map(({ name, href, icon: Icon }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centro: logo perfectamente centrado */}
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="absolute left-1/2 -translate-x-1/2 select-none"
        >
          <Image
            src="/logo.png"
            alt="Daniel Reyna — Psicólogo"
            width={140}
            height={40}
            className="h-7 w-auto md:h-8"
            priority
          />
        </Link>

        {/* Derecha: redes (ocultas en móvil, visibles desde md) */}
        <div className="flex w-10 items-center justify-end md:w-auto md:gap-5">
          <div className="hidden md:flex items-center gap-5">
            {socials.map(({ name, href, icon: Icon }) => (
              <a
                key={`top-${name}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-gray-100"
                title={name}
              >
                <Icon className="h-5 w-5 text-[#043222]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
