"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react"; // usamos íconos de lucide-react

export default function SiteHeader() {
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Social icons a la izquierda */}
        <div className="flex items-center space-x-4">
          <Link
            href="https://instagram.com/psic.danielreyna"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5 text-gray-700 hover:text-pink-600" />
          </Link>
          <Link
            href="https://facebook.com/psic.danielreyna"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5 text-gray-700 hover:text-blue-600" />
          </Link>
          <Link
            href="https://youtube.com/@psicdanielreyna"
            target="_blank"
            aria-label="YouTube"
          >
            <Youtube className="h-5 w-5 text-gray-700 hover:text-red-600" />
          </Link>
          <Link
            href="https://x.com/psicdanielreyna"
            target="_blank"
            aria-label="X"
          >
            <Twitter className="h-5 w-5 text-gray-700 hover:text-black" />
          </Link>
        </div>

        {/* Logo en el centro (texto clickable) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-gray-800 hover:text-gray-600"
          >
            Daniel Reyna - Psicólogo
          </Link>
        </div>
      </div>
    </header>
  );
}