// components/header.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Daniel Reyna — Psicólogo
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/servicios">Servicios</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/sobre-mi">Sobre mí</Link>
          <Button asChild className="rounded-full">
            <Link href="/agenda">Agenda</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

