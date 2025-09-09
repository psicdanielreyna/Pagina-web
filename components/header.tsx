// components/header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Inicializa desde localStorage o estado actual del <html>
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("dr-theme");
    const initial = saved ? saved === "dark" : root.classList.contains("dark");
    root.classList.toggle("dark", initial);
    setIsDark(initial);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle("dark", next);
    localStorage.setItem("dr-theme", next ? "dark" : "light");
  };

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
