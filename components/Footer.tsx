"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const NAV = [
  { label: "Blog", href: "/blog" },
  { label: "Servicios", href: "/servicios" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/psic.danielreyna",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/psic.danielreyna",
    Icon: FaFacebook,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@Psicdanielreyna",
    Icon: FaYoutube,
  },
  {
    label: "X",
    href: "https://x.com/psicdanielreyna",
    Icon: FaXTwitter,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Top */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              {/* Usa tu logo (ajusta width/height si lo hiciste más grande) */}
              <Image
                src="/logo.png"
                alt="Daniel Reyna — Psicólogo"
                width={48}
                height={48}
                className="rounded-sm"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                Daniel Reyna — Psicólogo
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Terapia clara y práctica. Herramientas simples para sentirte mejor
              en tu día a día.
            </p>
            {/* Redes */}
            <div className="mt-2 flex items-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-50 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav className="md:justify-self-center">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Navegación
            </h3>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:opacity-80 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="md:justify-self-end">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hola@danielreyna.mx"
                  className="hover:opacity-80 transition"
                >
                  hola@danielreyna.mx
                </a>
              </li>
              <li className="text-muted-foreground">
                Monterrey, N.L. · México
              </li>
              <li className="text-muted-foreground">Atención en línea</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-6 text-xs text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Daniel Reyna. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/legal" className="hover:opacity-80 transition">
              Aviso de privacidad
            </Link>
            <Link href="/terminos" className="hover:opacity-80 transition">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}