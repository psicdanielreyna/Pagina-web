"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/psic.danielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/psic.danielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M13 10h3V7h-3c-1.7 0-3 1.3-3 3v2H8v3h2v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Psicdanielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M22 12c0 2.9-.2 4.7-.4 5.6a3 3 0 0 1-2 2c-.9.3-5.6.4-7.6.4s-6.7-.1-7.6-.4a3 3 0 0 1-2-2C.2 16.7 0 14.9 0 12s.2-4.7.4-5.6a3 3 0 0 1 2-2C3.3 4.1 8 4 10 4s6.7.1 7.6.4a3 3 0 0 1 2 2c.2.9.4 2.7.4 5.6Z"
          fill="currentColor"
        />
        <path d="M10 9v6l5-3-5-3Z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/psicdanielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M3 3h5l4.5 6 5.5-6H21l-7.2 8L21 21h-5l-4.6-6L5 21H3l8.2-9L3 3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // cierra el drawer al cambiar de tamaño a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Hamburguesa (izquierda) */}
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md p-2 text-foreground/80 hover:bg-muted lg:hidden"
          aria-label="Abrir menú"
        >
          <span className="sr-only">Abrir menú</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo centrado */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" aria-label="Ir al inicio" className="block">
            <Image
              src="/logo.png"
              alt="Daniel Reyna — Psicólogo"
              width={220}
              height={44}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Redes (derecha) */}
        <nav className="hidden items-center gap-5 lg:flex">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
              aria-label={s.name}
              title={s.name}
            >
              <span className="text-foreground/80">{s.svg}</span>
              <span className="sr-only">{s.name}</span>
            </a>
          ))}
        </nav>

        {/* Placeholder para equilibrar el espacio (en desktop) */}
        <div className="hidden lg:block w-10" />

        {/* Drawer móvil */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <aside
              className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="text-sm font-medium">Menú</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-2 hover:bg-muted"
                  aria-label="Cerrar menú"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="px-4 py-3 space-y-1">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/blog", label: "Blog" },
                  { href: "/servicios", label: "Servicios" },
                  { href: "/sobre-mi", label: "Sobre mí" },
                  { href: "/contacto", label: "Contacto" },
                ].map((i) => (
                  <Link
                    key={i.href}
                    onClick={() => setOpen(false)}
                    href={i.href}
                    className="block rounded-md px-3 py-2 text-foreground/90 hover:bg-muted"
                  >
                    {i.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-2 border-t px-4 py-3">
                <p className="mb-2 text-xs text-muted-foreground">Sígueme</p>
                <div className="flex items-center gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-foreground/80 hover:bg-muted"
                      aria-label={s.name}
                      title={s.name}
                    >
                      {s.svg}
                      <span>{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </header>
  );
}