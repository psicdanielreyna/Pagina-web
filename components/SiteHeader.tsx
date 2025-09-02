"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Botón menú hamburguesa */}
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger className="p-2">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white">
              <nav className="flex flex-col gap-4">
                <Link href="/blog">Blog</Link>
                <Link href="/servicios">Servicios</Link>
                <Link href="/sobre-mi">Sobre mí</Link>
                <Link href="/contacto">Contacto</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Título centrado */}
        <div className="flex-grow text-center">
          <Link
            href="/"
            className="text-lg font-serif font-semibold hover:text-gray-600 transition"
          >
            Daniel Reyna - Psicólogo
          </Link>
        </div>

        {/* Redes sociales */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/Psic.danielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/@Psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/psicdanielreyna"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}