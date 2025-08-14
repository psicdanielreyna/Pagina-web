// components/footer.tsx
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex items-center justify-between gap-4 flex-wrap">
        <p>© {new Date().getFullYear()} Daniel Reyna — Psicólogo. Todos los derechos reservados.</p>
        <nav className="flex items-center gap-6">
          <Link href="/privacidad" className="hover:underline">Privacidad</Link>
          <Link href="/newsletter" className="hover:underline">Newsletter</Link>
        </nav>
      </div>
    </footer>
  )
}
