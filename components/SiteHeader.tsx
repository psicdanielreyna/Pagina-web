"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

/** SVG icons */
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5.35-2.05a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z"/>
    </svg>
  );
}
function IconFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.5 1.7-1.5h1.4V5c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.9 1.4-3.9 4.1V11H8v3h2.4v8h3.1Z"/>
    </svg>
  );
}
function IconYouTube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 7.5a4 4 0 0 0-2.8-2.8C18.7 4.2 12 4.2 12 4.2s-6.7 0-8.2.5A4 4 0 0 0 1 7.5C.6 9.1.6 12 .6 12s0 2.9.4 4.5a4 4 0 0 0 2.8 2.8c1.5.5 8.2.5 8.2.5s6.7 0 8.2-.5a4 4 0 0 0 2.8-2.8c.4-1.6.4-4.5.4-4.5s0-2.9-.4-4.5ZM9.9 15.4V8.6L15.7 12l-5.8 3.4Z"/>
    </svg>
  );
}
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 3h3.4l5.2 6.8L17.6 3H21l-7.3 9.3L21 21h-3.4l-6-7.8L6.4 21H3l7.7-9.7L3 3Z"/>
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  /**
   * Bloqueo de scroll robusto:
   * - Ocultamos overflow en <html> y <body>
   * - Compensamos el ancho de la barra de scroll con padding-right
   * - Restauramos todo al cerrar
   */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;

    if (open) {
      const scrollbar = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      if (scrollbar > 0) {
        body.style.paddingRight = `${scrollbar}px`;
      }
    } else {
      html.style.overflow = prevHtmlOverflow || "";
      body.style.overflow = prevBodyOverflow || "";
      body.style.paddingRight = prevBodyPaddingRight || "";
    }

    return () => {
      html.style.overflow = prevHtmlOverflow || "";
      body.style.overflow = prevBodyOverflow || "";
      body.style.paddingRight = prevBodyPaddingRight || "";
    };
  }, [open]);

  const social = [
    { href: "https://instagram.com/psic.danielreyna", label: "Instagram", Icon: IconInstagram },
    { href: "https://facebook.com/psic.danielreyna", label: "Facebook", Icon: IconFacebook },
    { href: "https://youtube.com/@Psicdanielreyna", label: "YouTube", Icon: IconYouTube },
    { href: "https://x.com/psicdanielreyna", label: "X", Icon: IconX },
  ];

  return (
    <header className="sticky top-0 z-[40] border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Hamburguesa (izquierda) */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="mr-3 rounded p-2 hover:bg-black/5"
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>

        {/* Marca centrada con LOGO (más grande) */}
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <Link href="/" aria-label="Ir al inicio" className="pointer-events-auto inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Daniel Reyna - Psicólogo"
                width={480}
                height={112}
                priority
                className="h-14 w-auto md:h-16"
                sizes="(max-width: 768px) 220px, 480px"
              />
            </Link>
          </div>
        </div>

        {/* Redes (derecha) */}
        <nav className="ml-3 flex items-center gap-4">
          {social.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex items-center text-foreground hover:opacity-80"
              title={label}
            >
              <Icon />
            </Link>
          ))}
        </nav>
      </div>

      {/* Drawer */}
      {open && (
        <>
          {/* overlay por ENCIMA del header */}
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/40"
          />
          {/* panel por encima del overlay */}
          <aside
            className="fixed left-0 top-0 z-[70] h-full w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm text-muted-foreground">Menú</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-2 hover:bg-black/5"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-2 py-3">
              <Link href="/blog" onClick={() => setOpen(false)} className="rounded px-3 py-2 hover:bg-black/5">
                Blog
              </Link>
              <Link href="/servicios" onClick={() => setOpen(false)} className="rounded px-3 py-2 hover:bg-black/5">
                Servicios
              </Link>
              <Link href="/sobre-mi" onClick={() => setOpen(false)} className="rounded px-3 py-2 hover:bg-black/5">
                Sobre mí
              </Link>
              <Link href="/contacto" onClick={() => setOpen(false)} className="rounded px-3 py-2 hover:bg-black/5">
                Contacto
              </Link>
            </nav>

            <div className="border-t px-3 py-4">
              <p className="mb-2 text-sm text-muted-foreground">Sígueme</p>
              <div className="grid grid-cols-1 gap-2">
                {social.map(({ href, label, Icon }) => (
                  <Link
                    key={`drawer-${label}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border px-3 py-2 hover:bg-black/5"
                    onClick={() => setOpen(false)}
                  >
                    <Icon />
                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}