'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

/**
 * Header con logo centrado que redirige a inicio.
 * - Botón de menú (placeholder) a la izquierda
 * - Zona derecha libre para iconos sociales (opcional)
 */
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto flex h-16 items-center justify-center">
        {/* Izquierda: menú hamburguesa (placeholder) */}
        <button
          aria-label="Abrir menú"
          className="absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Centro: LOGO -> Home */}
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Daniel Reyna — Psicólogo"
            width={220}
            height={48}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Derecha: espacio para iconos sociales si los tienes */}
        <div className="absolute right-4 flex items-center gap-3">
          {/* Ejemplos:
          <a href="https://instagram.com/..." aria-label="Instagram" className="hover:opacity-80">IG</a>
          <a href="https://facebook.com/..." aria-label="Facebook" className="hover:opacity-80">FB</a>
          */}
        </div>
      </div>
    </header>
  );
}