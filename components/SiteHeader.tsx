"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com/psic.danielreyna",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm5.25-2a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z"
          />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/psic.danielreyna",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M13 3h4a1 1 0 0 1 1 1v4h-3a1 1 0 0 0-1 1v3h4l-1 4h-3v8h-4v-8H9v-4h2V9a4 4 0 0 1 4-4Z"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@Psicdanielreyna",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5 block" aria-hidden="true">
          <path
            d="M23.5 6.2c-.3-1.1-1.2-2-2.3-2.3C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.2.4C1.7 4.2.8 5.1.5 6.2 0 7.8 0 12 0 12s0 4.2.5 5.8c.3 1.1 1.2 2 2.3 2.3 1.6.4 9.2.4 9.2.4s7.6 0 9.2-.4c1.1-.3 2-1.2 2.3-2.3.5-1.6.5-5.8.5-5.8s0-4.2-.5-5.8Z"
            fill="currentColor"
          />
          <path d="M9.75 8.5v7l6-3.5-6-3.5Z" fill="#fff" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/psicdanielreyna",
      svg: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.5 3h5.1l4.5 6.5L18.6 3H22l-7.5 9.5L22 21h-5.1l-4.5-6.5L8.4 21H4.5l7.6-9.5L4.5 3Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Botón hamburguesa */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-neutral-100"
          aria-label="Abrir menú"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Logo centrado */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo.png"
            alt="Daniel Reyna - Psicólogo"
            width={180}
            height={40}
            priority
          />
        </Link>

        {/* Redes en desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground"
              aria-label={s.name}
              title={s.name}
            >
              {s.svg}
              <span className="sr-only">{s.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Drawer menú móvil */}
      {open && (
        <div className="fixed inset-0 z-[70]">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel blanco */}
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white border-r shadow-2xl z-[71]">
            {/* Header del panel */}
            <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b bg-white">
              <span className="text-sm font-medium">Menú</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-2 hover:bg-neutral-100"
                aria-label="Cerrar menú"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Links principales */}
            <nav className="px-2 py-3 space-y-1">
              {[
                { href: "/", label: "Inicio" },
                { href: "/blog", label: "Blog" },
                { href: "/servicios", label: "Servicios" },
                { href: "/sobre-mi", label: "Sobre mí" },
                { href: "/contacto", label: "Contacto" },
              ].map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-foreground/90 hover:bg-neutral-100"
                >
                  {i.label}
                </Link>
              ))}
            </nav>

            {/* Redes en drawer */}
            <div className="mt-2 border-t px-4 py-3">
              <p className="mb-2 text-xs text-muted-foreground">Sígueme</p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground/80 hover:bg-neutral-100"
                    aria-label={s.name}
                    title={s.name}
                    onClick={() => setOpen(false)}
                  >
                    {s.svg}
                    <span className="sr-only">{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}