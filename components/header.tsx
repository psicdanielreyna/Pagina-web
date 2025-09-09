// components/header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Toggle de tema simple: alterna la clase `dark` en <html>
function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    localStorage.setItem("dr-theme", el.classList.contains("dark") ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("dr-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:opacity-90"
      aria-label="Cambiar tema"
    >
      {isDark ? "Claro" : "Oscuro"}
    </button>
  );
}

export default function Header() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Marca */}
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Daniel Reyna — Psicólogo
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/tienda" className="hover:underline">Tienda</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/sobre-mi" className="hover:underline">Sobre mí</Link>
          <Link href="/agenda" className="hover:underline">Agenda</Link>
          <ThemeToggle />
        </nav>

        {/* Menú móvil */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Abrir menú" className="inline-flex h-10 w-10 items-center justify-center rounded-md border">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="mt-6 flex flex-col gap-4 text-base">
                <Link href="/" className="font-semibold text-lg">Inicio</Link>
                <Link href="/servicios" className="hover:underline">Servicios</Link>
                <Link href="/tienda" className="hover:underline">Tienda</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
                <Link href="/sobre-mi" className="hover:underline">Sobre mí</Link>
                <Link href="/agenda" className="hover:underline">Agenda</Link>

                <div className="my-2 h-px bg-muted" />

                {/* Extras que querías mover del footer */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <Link href="/legal" className="hover:underline">Aviso de privacidad</Link>
                  <Link href="/contacto" className="hover:underline">Contacto</Link>
                </div>

                <div className="pt-4">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
