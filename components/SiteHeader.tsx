"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteNav, socialLinks } from "@/lib/site";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function SocialIcon({ name }: { name: string }) {
  const map: Record<string, JSX.Element> = {
    instagram: <Instagram className="size-5" />,
    facebook: <Facebook className="size-5" />,
    youtube: <Youtube className="size-5" />,
    twitter: <Twitter className="size-5" />,
  };
  return map[name] ?? <span />;
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Izquierda: menú */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger aria-label="Abrir navegación" className="rounded-xl p-2 hover:bg-gray-100">
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="px-5 py-4">
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <nav className="px-2 pb-5">
                <ul className="space-y-1">
                  {siteNav.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={clsx(
                            "flex items-center rounded-lg px-3 py-2 text-sm transition",
                            active
                              ? "bg-gray-900 text-white"
                              : "text-gray-800 hover:bg-gray-100"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="border-t px-5 py-4">
                <p className="mb-2 text-xs font-medium text-gray-500">Sígueme</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex items-center justify-center rounded-full border p-2 text-gray-700 hover:bg-gray-50"
                    >
                      <SocialIcon name={s.icon} />
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Centro: logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          {/* Ajusta el src si tu logo es otro archivo */}
          <Image
            src="/logo.png"
            alt="Daniel Reyna — Psicólogo"
            width={150}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Derecha: iconos de redes */}
        <div className="ml-auto flex items-center gap-3">
          {socialLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-gray-100"
            >
              <SocialIcon name={s.icon} />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
