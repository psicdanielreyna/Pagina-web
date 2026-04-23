"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X as XIcon, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
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

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/servicios", label: "Servicios" },
  { href: "/talleres", label: "Talleres" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-[60] w-full border-b border-black/8 backdrop-blur"
      style={{ background: "rgba(248,245,240,0.92)" }}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14 md:h-16">

        {/* Hamburguesa */}
        <Sheet>
          <SheetTrigger
            aria-label="Abrir menú"
            className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-black/5 transition-colors focus:outline-none"
          >
            <MenuIcon className="h-5 w-5 text-zinc-700" />
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] max-w-[85vw] p-0 border-r border-black/8" style={{ background: "#F8F5F0" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
              <SheetTitle className="text-sm font-medium text-zinc-500 tracking-wide uppercase">
                Menú
              </SheetTitle>
              <SheetClose aria-label="Cerrar" className="rounded-lg p-1.5 hover:bg-black/5 transition-colors">
                <XIcon className="h-4 w-4 text-zinc-500" />
              </SheetClose>
            </div>

            <nav className="px-3 py-4">
              <ul className="space-y-0.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose asChild>
                      <Link
                        href={href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-zinc-700 hover:bg-black/5 hover:text-zinc-900 transition-colors"
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Redes en el drawer móvil */}
            <div className="absolute bottom-8 left-0 right-0 px-5">
              <p className="text-xs text-zinc-400 mb-3 uppercase tracking-wide">Redes sociales</p>
              <div className="flex gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-black/5 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-zinc-600" />
                  </a>
                ))}
              </div>
            </div>
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
            className="h-7 w-auto md:h-8"
            priority
          />
        </Link>

        {/* Redes sociales — derecha */}
        <div className="flex items-center gap-1">
          {socials.map(({ name, href, icon: Icon }) => (
            
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-black/5 transition-colors"
            >
              <Icon className="h-4 w-4 text-zinc-600" />
            </a>
          ))}
        </div>

      </div>
    </header>
  );
}