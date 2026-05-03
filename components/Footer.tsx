"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/servicios", label: "Servicios" },
  { href: "/talleres", label: "Talleres" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
  { href: "/faq", label: "Preguntas frecuentes" },
];

const socials = [
  { href: "https://instagram.com/psic.danielreyna", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com/psic.danielreyna", icon: Facebook, label: "Facebook" },
  { href: "https://youtube.com/@Psicdanielreyna", icon: Youtube, label: "YouTube" },
  { href: "https://x.com/psicdanreyna", icon: Twitter, label: "X" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer>
      {/* Franja verde — newsletter */}
      <div style={{ background: "#1D9E75" }} className="px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-white mb-1">
              Una idea práctica cada semana
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              Únete al newsletter. Sin spam, baja cuando quieras.
            </p>
          </div>
          {status === "ok" ? (
            <p className="text-sm font-medium text-white">¡Listo! Te esperamos en el inbox 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="flex-1 md:w-56 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                style={{ background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.25)" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-50 transition-colors whitespace-nowrap disabled:opacity-60"
                style={{ color: "#0F6E56" }}
              >
                {status === "loading" ? "..." : "Suscribirme"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Franja eggshell — links */}
      <div style={{ background: "#F8F5F0" }} className="px-6 py-10 border-t border-black/8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Info */}
          <div>
            <img src="/logo.png" alt="Daniel Reyna" className="h-7 w-auto mb-3" />
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">
              Psicólogo clínico TCC especializado en ansiedad y estrés. Monterrey · En línea.
            </p>
            <div className="flex gap-2 mt-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-black/8 hover:bg-black/5 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-zinc-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">
              Páginas
            </p>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Más */}
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-4">
              Más
            </p>
            <ul className="space-y-2">
              {navLinks.slice(4).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/legal" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/8 pt-6 flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Daniel Reyna · Todos los derechos reservados
          </p>
          <p className="text-xs text-zinc-400">
            Monterrey, N.L. · México
          </p>
        </div>
      </div>
    </footer>
  );
}