"use client";

import { useState } from "react";
import Link from "next/link";

/** Ajusta aquí tus enlaces de navegación */
const NAV = [
  { href: "/blog", label: "Blog" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

/** Redes con icono + nombre a la derecha */
const SOCIAL = [
  {
    name: "Instagram",
    href: "https://instagram.com/psic.danielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 17.8 2.8 2.8 0 0 0 12 9.2zm4.9-.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/psic.danielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.8 1.9-1.8H17V2.2C16.6 2.1 15.5 2 14.2 2 11.4 2 9.5 3.7 9.5 7v3H6v4h3.5v8H13z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@Psicdanielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3.1 3.1 0 0 0-2.2-2.2C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.3.5A3.1 3.1 0 0 0 .5 6.2 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.8 3.1 3.1 0 0 0 2.2 2.2c1.7.5 9.3.5 9.3.5s7.6 0 9.3-.5a3.1 3.1 0 0 0 2.2-2.2A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.8zM9.8 15.5V8.5L15.6 12l-5.8 3.5z"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/psicdanielreyna",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M18.2 2h3.1l-6.8 7.8 8 12.2h-6.3l-4.9-7-5.6 7H2.6l7.3-8.5L2 2h6.4l4.4 6.2zM16.9 19.7h1.7L7.2 4.3H5.4l11.5 15.4z"/>
      </svg>
    ),
  },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative flex h-14 items-center justify-center">
            {/* Izquierda: Hamburguesa */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="absolute left-0 inset-y-0 inline-flex items-center justify-center px-2 rounded-md hover:bg-neutral-100"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6 text-neutral-800" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>

            {/* Centro: Marca */}
            <Link
              href="/"
              aria-label="Ir al inicio"
              className="text-center text-base sm:text-lg font-semibold tracking-wide text-neutral-900"
            >
              Daniel Reyna — Psicólogo
            </Link>

            {/* Derecha: Redes con nombre */}
            <nav className="absolute right-0 inset-y-0 hidden sm:flex items-center gap-4 text-neutral-700">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 hover:text-neutral-900 transition"
                  aria-label={s.name}
                >
                  {s.svg}
                  <span className="text-sm">{s.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* OVERLAY + DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* fondo opaco */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* panel */}
          <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 h-14 border-b">
              <span className="font-medium">Menú</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-md hover:bg-neutral-100"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3 10.6 10.6 16.9 4.3z" />
                </svg>
              </button>
            </div>

            <nav className="px-4 py-3 space-y-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base text-neutral-800 hover:bg-neutral-100"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 border-t pt-3">
                <p className="px-3 pb-2 text-sm text-neutral-500">Sígueme</p>
                <div className="grid grid-cols-2 gap-2 px-3">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-neutral-50"
                    >
                      {s.svg}
                      <span className="text-sm">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}