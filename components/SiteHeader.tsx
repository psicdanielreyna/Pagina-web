"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Menu as MenuIcon,
  X as XIcon,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
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
    <header className="sticky top-0 z-[60] w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto max-w-6xl flex items-center justify-between px-4 h-14 md:h-16">
        {/* Hamburguesa (móvil) */}
        <Sheet>
          <SheetTrigger
            aria-label="Abrir menú"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            <MenuIcon className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="left" className="w-[320px] max-w-[85vw] p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
              <SheetTitle className="text-base font-medium">Menú</SheetTitle>
              <SheetClose aria-label="Cerrar" className="rounded-md p-2 hover:bg-gray-100">
                <XIcon className="h-5 w-5" />
              </SheetClose>
            </div>

            <nav className="px-4 py-4">
              <ul className="space-y-3">
                <li>
                  <SheetClose asChild>
                    <Link href="/blog" className="block rounded-md px-2 py-2 hover:bg-gray-100">Blog</Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/servicios" className="block rounded-md px-2 py-2 hover:bg-gray-100">Servicios</Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/sobre-mi" className="block rounded-md px-2 py-2 hover:bg-gray-100">Sobre mí</Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/talleres" className="block rounded-md px-2 py-2 hover:bg-gray-100">Talleres</Link>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Link href="/contacto" className="block rounded-md px-2 py-2 hover:bg-gray-100">Contacto</Link>
                  </SheetClose>
                </li>
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

        {/* Logo centrado */}
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="absolute left-1/2 -translate-x-1/2 select-none"
        >
          <Image
            src="/logo.png"
            alt="Daniel Reyna — Psicólogo"
            width={180}
            height={36}
            className="h-7 w-auto md:h-9"
            priority
          />
        </Link>

        {/* Menú superior (desktop) + redes */}
        <div className="ml-auto hidden sm:flex items-center gap-6 pr-1">
          <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-black">
            Blog
          </Link>
          <Link href="/servicios" className="text-sm font-medium text-gray-700 hover:text-black">
            Servicios
          </Link>
          <Link href="/sobre-mi" className="text-sm font-medium text-gray-700 hover:text-black">
            Sobre mí
          </Link>
          <Link href="/talleres" className="text-sm font-medium text-gray-700 hover:text-black">
            Talleres
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-gray-700 hover:text-black">
            Contacto
          </Link>

          {/* Redes */}
          <div className="flex items-center gap-4 pl-4 border-l">
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
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}