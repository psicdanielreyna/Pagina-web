import Link from "next/link"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo y descripción */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.png" alt="Daniel Reyna – Psicólogo" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-gray-600">
            Terapia clara y práctica. Herramientas simples para sentirte mejor en tu día a día.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="https://instagram.com/psic.danielreyna" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-emerald-700 transition-colors" />
            </Link>
            <Link href="https://facebook.com/psic.danielreyna" target="_blank" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-emerald-700 transition-colors" />
            </Link>
            <Link href="https://youtube.com/@Psicdanielreyna" target="_blank" aria-label="YouTube">
              <Youtube className="h-5 w-5 hover:text-emerald-700 transition-colors" />
            </Link>
            <Link href="https://x.com/psicdanreyna" target="_blank" aria-label="X">
              <Twitter className="h-5 w-5 hover:text-emerald-700 transition-colors" />
            </Link>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="font-semibold mb-3">NAVEGACIÓN</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/servicios">Servicios</Link></li>
            <li><Link href="/sobre-mi">Sobre mí</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="font-semibold mb-3">CONTACTO</h3>
          <p className="text-sm text-gray-700">danielreyna@danielreyna.mx</p>
          <p className="text-sm text-gray-700">Monterrey, N.L. · México</p>
          <p className="text-sm text-gray-700">Atención en línea</p>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Daniel Reyna. Todos los derechos reservados.
      </div>
    </footer>
  )
}
