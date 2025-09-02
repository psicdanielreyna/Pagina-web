"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Menu, X as Close } from "lucide-react";

/** SVG propio para el logo de X */
function XLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 1227"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="X"
      className={className}
      fill="currentColor"
    >
      <path d="M714 519 1166 0H1024L662 417 372 0H0l472 648L0 1227h142l383-438 304 438h372L714 519Zm-135 155-44-61L194 96h136l221 308 44 61 365 506H824L579 674Z"/>
    </svg>
  );
}

type Social = { name: string; href: string; icon: React.ComponentType<{ className?: string }> };

const socials: Social[] = [
  { name: "Instagram", href: "https://instagram.com/psic.danielreyna", icon: Instagram },
  { name: "Facebook",  href: "https://facebook.com/Psic.danielreyna", icon: Facebook  },
  { name: "YouTube",   href: "https://youtube.com/@Psicdanielreyna", icon: Youtube   },
  { name: "X",         href: "https://x.com/psicdanielreyna",        icon: XLogo     },
];

const nav = [
  { name: "Blog",      href: "/blog" },
  { name: "Servicios", href: "/servicios" },
  { name: "Sobre mí",  href: "/sobre-mi" },
  { name: "Contacto",  href: "/contacto" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <header className="relative border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Izquierda: hamburguesa */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Centro: logo (más grande y centrado) */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="pointer-events-auto block" aria-label="Ir al inicio">
            <Image
              src="/logo.png"
              alt="Daniel Reyna - Psicólogo"
              width={300}
              height={70}
              className="mx-auto h-auto w-[260px] sm:w-[300px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Derecha: redes */}
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Drawer */}
      {open && (
        <>
          {/* Fondo (oscurecido) */}
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          {/* Panel blanco 100% sólido */}
          <aside className="fixed left-0 top-0 z-50 h-full w-80 max-w-[90vw]">
            <div className="flex h-full w-full flex-col rounded-r-xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <span className="text-lg font-medium">Menú</span>
                <button
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>

              <nav className="px-4 py-3">
                <ul className="space-y-2">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-md px-3 py-2 text-base hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="my-4 border-t" />

                <p className="px-3 pb-2 text-sm text-gray-500">Sígueme</p>
                <div className="grid grid-cols-2 gap-2 px-3">
                  {socials.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={`drawer-${name}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </aside>
        </>
      )}
    </header>
  );
}