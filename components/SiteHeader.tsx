'use client';
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative mx-auto flex h-16 items-center justify-center">
        <button
          aria-label="Abrir menú"
          className="absolute left-4 inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo.png"                // <-- tu archivo en /public
            alt="Daniel Reyna — Psicólogo"
            width={220}
            height={48}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="absolute right-4 flex items-center gap-3">{/* social aquí si quieres */}</div>
      </div>
    </header>
  );
}