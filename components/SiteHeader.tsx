"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Daniel Reyna - Psicólogo"
            width={160}
            height={48}
            priority
          />
        </Link>

        {/* Desktop redes */}
        <div className="hidden space-x-4 md:flex">
          <Link
            href="https://instagram.com/psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://facebook.com/psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="https://youtube.com/@psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="h-5 w-5" />
          </Link>
          <Link
            href="https://x.com/psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </Link>
        </div>

        {/* Botón hamburguesa en mobile */}
        <button
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú lateral (mobile) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white px-6 py-6 shadow-lg md:hidden">
          <button
            className="mb-6 flex w-full justify-end text-gray-700"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="space-y-4">
            <Link href="/blog" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/servicios" onClick={() => setOpen(false)}>
              Servicios
            </Link>
            <Link href="/sobre-mi" onClick={() => setOpen(false)}>
              Sobre mí
            </Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </nav>

          <div className="mt-8 border-t pt-4">
            <p className="mb-2 text-sm font-semibold">Sígueme</p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/psic.danielreyna"
                target="_blank"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/psic.danielreyna"
                target="_blank"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@psicdanielreyna"
                target="_blank"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/psicdanielreyna" target="_blank">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}