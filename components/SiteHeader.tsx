'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Ajusta aquí tus URLs de redes
const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com/tuusuario' },
  { name: 'Facebook',  href: 'https://facebook.com/tuusuario' },
  { name: 'YouTube',   href: 'https://youtube.com/@tuusuario' },
  { name: 'X',         href: 'https://x.com/tuusuario' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Barra superior */}
        <div className="flex h-16 items-center justify-between">
          {/* Hamburguesa (izquierda en desktop oculta) */}
          <button
            aria-label="Abrir menú"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden"
            onClick={() => setOpen(true)}
          >
            <span className="i-lucide-menu size-5" />
          </button>

          {/* LOGO centrado */}
          <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Daniel Reyna — Psicólogo"
                width={220}
                height={48}
                priority
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Redes (desktop) */}
          <nav className="hidden gap-4 md:flex">
            {SOCIALS.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {s.name}
              </Link>
            ))}
          </nav>

          {/* Separador para balancear en mobile */}
          <div className="w-10 md:hidden" />
        </div>
      </div>

      {/* Drawer móvil */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-80 bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Daniel Reyna — Psicólogo"
                  width={180}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <button
                aria-label="Cerrar menú"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
                onClick={() => setOpen(false)}
              >
                <span className="i-lucide-x size-5" />
              </button>
            </div>

            <nav className="space-y-3">
              <Link href="/" onClick={() => setOpen(false)} className="block text-lg">
                Inicio
              </Link>
              <Link href="/blog" onClick={() => setOpen(false)} className="block text-lg">
                Blog
              </Link>
              <Link href="/servicios" onClick={() => setOpen(false)} className="block text-lg">
                Servicios
              </Link>
              <Link href="/sobre-mi" onClick={() => setOpen(false)} className="block text-lg">
                Sobre mí
              </Link>
              <div className="my-4 h-px bg-border" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sígueme</p>
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
}