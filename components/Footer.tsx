"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!turnstileToken) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken }),
      });
      setStatus(res.ok ? "ok" : "error");
      if (!res.ok) turnstileRef.current?.reset();
    } catch {
      setStatus("error");
      turnstileRef.current?.reset();
    }
  }

  return (
    <footer>
      {/* Franja verde — newsletter */}
      <div style={{ background: "#1D9E75" }} className="px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-white mb-1">Una idea práctica cada semana</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              Únete al newsletter. Sin spam, baja cuando quieras.
            </p>
          </div>
          {status === "ok" ? (
            <p className="text-sm font-medium text-white">¡Listo! Te esperamos en el inbox 🎉</p>
          ) : (
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <form onSubmit={handleSubmit} className="flex gap-2">
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
                  disabled={status === "loading" || !turnstileToken}
                  className="rounded-full bg-white text-sm font-medium px-5 py-2.5 hover:bg-emerald-50 transition-colors whitespace-nowrap disabled:opacity-60"
                  style={{ color: "#0F6E56" }}
                >
                  {status === "loading" ? "..." : "Suscribirme"}
                </button>
              </form>
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "dark" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Franja links */}
      <div
        className="px-6 py-10"
        style={{
          background: "var(--bg-primary)",
          borderTop: "0.5px solid var(--border)",
        }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Info */}
          <div>
            <img src="/logo.png" alt="Daniel Reyna" className="h-7 w-auto mb-3" />
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: "var(--text-secondary)" }}>
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
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors"
                  style={{ border: "0.5px solid var(--border)" }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: "var(--text-secondary)" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Páginas */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--text-tertiary)" }}>
              Páginas
            </p>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Más */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--text-tertiary)" }}>
              Más
            </p>
            <ul className="space-y-2">
              {navLinks.slice(4).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/legal" className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-xs transition-colors" style={{ color: "var(--text-secondary)" }}>
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex items-center justify-between" style={{ borderTop: "0.5px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} Daniel Reyna · Todos los derechos reservados
          </p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Monterrey, N.L. · México
          </p>
        </div>
      </div>
    </footer>
  );
}