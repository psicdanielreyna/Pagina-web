"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu as MenuIcon, X as XIcon, Instagram, Facebook, Youtube, Twitter, Sun, Moon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";

const socials = [
  { name: "Instagram", href: "https://instagram.com/psic.danielreyna", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com/psic.danielreyna", icon: Facebook },
  { name: "YouTube", href: "https://youtube.com/@Psicdanielreyna", icon: Youtube },
  { name: "X", href: "https://x.com/psicdanreyna", icon: Twitter },
];

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/servicios", label: "Servicios" },
  { href: "/talleres", label: "Talleres" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/faq", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} aria-label={isDark ? "Modo claro" : "Modo oscuro"} className="inline-flex items-center justify-center rounded-lg p-2 transition-colors" style={{ color: isDark ? "#94a3b8" : "#52525b" }}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function SiteHeader() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-[60] w-full backdrop-blur" style={{ background: isDark ? "rgba(15,15,26,0.92)" : "rgba(248,245,240,0.92)", borderBottom: `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-14 md:h-16">
        <Sheet>
          <SheetTrigger aria-label="Abrir menú" className="inline-flex items-center justify-center rounded-lg p-2 transition-colors focus:outline-none">
            <MenuIcon className="h-5 w-5" style={{ color: isDark ? "#94a3b8" : "#3f3f46" }} />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] max-w-[85vw] p-0" style={{ background: isDark ? "#0f0f1a" : "#F8F5F0", borderRight: `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` }}>
              <SheetTitle className="text-sm font-medium tracking-wide uppercase" style={{ color: isDark ? "#475569" : "#71717a" }}>Menú</SheetTitle>
              <SheetClose aria-label="Cerrar" className="rounded-lg p-1.5 transition-colors" style={{ color: isDark ? "#475569" : "#71717a" }}>
                <XIcon className="h-4 w-4" />
              </SheetClose>
            </div>
            <nav className="px-3 py-4">
              <ul className="space-y-0.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <SheetClose asChild>
                      <Link href={href} className="block rounded-lg px-3 py-2.5 text-sm transition-colors" style={{ color: isDark ? "#94a3b8" : "#3f3f46" }}>{label}</Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="px-5 py-4" style={{ borderTop: `0.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` }}>
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: isDark ? "#475569" : "#a1a1aa" }}>Apariencia</p>
              <div className="flex gap-2">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button key={t} onClick={() => setTheme(t)} className="flex-1 rounded-lg py-2 text-xs font-medium transition-colors" style={{ background: theme === t ? (isDark ? "rgba(29,158,117,0.2)" : "#E1F5EE") : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"), color: theme === t ? (isDark ? "#5DCAA5" : "#0F6E56") : (isDark ? "#94a3b8" : "#52525b") }}>
                    {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Auto"}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 px-5">
              <p className="text-xs uppercase tracking-wide mb-3" style={{ color: isDark ? "#475569" : "#a1a1aa" }}>Redes sociales</p>
              <div className="flex gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex items-center justify-center rounded-lg p-2 transition-colors">
                    <Icon className="h-4 w-4" style={{ color: isDark ? "#64748b" : "#52525b" }} />
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" aria-label="Ir al inicio" className="absolute left-1/2 -translate-x-1/2 select-none">
          <Image src="/logo.png" alt="Daniel Reyna — Psicólogo" width={180} height={36} className="h-7 w-auto md:h-8" priority />
        </Link>
        <div className="flex items-center gap-1">
          {socials.map(({ name, href, icon: Icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="hidden sm:inline-flex items-center justify-center rounded-lg p-2 transition-colors">
              <Icon className="h-4 w-4" style={{ color: isDark ? "#64748b" : "#52525b" }} />
            </a>
          ))}
          <ThemeToggle isDark={isDark} onToggle={() => setTheme(isDark ? "light" : "dark")} />
        </div>
      </div>
    </header>
  );
}
