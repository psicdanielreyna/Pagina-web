"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function SiteHeader() {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Botón menú hamburguesa */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white p-6 w-72 shadow-lg"
          >
            <SheetClose asChild>
              <button className="absolute top-4 right-4 text-xl">×</button>
            </SheetClose>
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/blog">Blog</Link>
              <Link href="/servicios">Servicios</Link>
              <Link href="/sobre-mi">Sobre mí</Link>
              <Link href="/contacto">Contacto</Link>
            </nav>
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-2">Sígueme</h4>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://instagram.com/psic.danielreyna"
                  target="_blank"
                  className="flex items-center gap-2 border px-2 py-1 rounded-md"
                >
                  <FaInstagram /> Instagram
                </Link>
                <Link
                  href="https://facebook.com/psic.danielreyna"
                  target="_blank"
                  className="flex items-center gap-2 border px-2 py-1 rounded-md"
                >
                  <FaFacebook /> Facebook
                </Link>
                <Link
                  href="https://youtube.com/@psicdanielreyna"
                  target="_blank"
                  className="flex items-center gap-2 border px-2 py-1 rounded-md"
                >
                  <FaYoutube /> YouTube
                </Link>
                <Link
                  href="https://x.com/psicdanielreyna"
                  target="_blank"
                  className="flex items-center gap-2 border px-2 py-1 rounded-md"
                >
                  <FaXTwitter /> X
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo centrado */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/logo.png"
            alt="Daniel Reyna - Psicólogo"
            width={180}   // antes 220
            height={60}
            className="object-contain"
            priority
          />
        </Link>

        {/* Redes solo con íconos (sin nombres) */}
        <div className="ml-auto hidden md:flex items-center gap-5 text-lg">
          <Link href="https://instagram.com/psic.danielreyna" target="_blank">
            <FaInstagram />
          </Link>
          <Link href="https://facebook.com/psic.danielreyna" target="_blank">
            <FaFacebook />
          </Link>
          <Link href="https://youtube.com/@psicdanielreyna" target="_blank">
            <FaYoutube />
          </Link>
          <Link href="https://x.com/psicdanielreyna" target="_blank">
            <FaXTwitter />
          </Link>
        </div>
      </div>
    </header>
  );
}