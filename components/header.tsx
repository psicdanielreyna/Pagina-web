'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header(){
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-semibold">PsicoToolKit</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/tienda" className="hover:underline">Tienda</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/sobre-mi" className="hover:underline">Sobre mí</Link>
          <Button asChild size="sm"><Link href="/agenda">Agenda</Link></Button>
        </nav>
        <button className="md:hidden p-2" onClick={()=>setOpen(!open)} aria-label="Abrir menú">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="container py-2 flex flex-col gap-2">
            <Link href="/servicios" onClick={()=>setOpen(false)}>Servicios</Link>
            <Link href="/tienda" onClick={()=>setOpen(false)}>Tienda</Link>
            <Link href="/blog" onClick={()=>setOpen(false)}>Blog</Link>
            <Link href="/sobre-mi" onClick={()=>setOpen(false)}>Sobre mí</Link>
            <Button asChild size="sm" className="w-fit"><Link href="/agenda">Agenda</Link></Button>
          </div>
        </div>
      )}
    </header>
  )
}
