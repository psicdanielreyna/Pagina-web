// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4">
        <Link href="/" aria-label="Ir al inicio" className="inline-flex">
          <Image
            src="/logo.png"       // asegúrate de tener /public/logo.png
            alt="Daniel Reyna — Psicólogo"
            width={200}           // ajusta a tu gusto
            height={52}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
