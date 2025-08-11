import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, ShoppingBag, BookOpen } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { PostCard } from '@/components/post-card'
import { NewsletterForm } from '@/components/newsletter-form'

const products = [
  { id: 'overthinking', title: 'Cómo Apagar tu Mente', price: 'MXN —', href: '/tienda/overthinking', description: 'Workbook práctico para calmar el sobrepensamiento.', image: '/placeholder.svg' },
  { id: 'kit-ansiedad', title: 'Kit Terapeuta: Ansiedad', price: 'MXN —', href: '/tienda/kit-ansiedad', description: 'Hojas de trabajo, scripts y plan de 6 sesiones.', image: '/placeholder.svg' },
]

export default function Home() {
  return (
    <div className="">
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
  Terapia clara, herramientas prácticas.
</h1>
<p className="text-lg text-muted-foreground">
  Psicología cognitivo-conductual (CBT) con enfoque breve. Contenido y recursos que sí ayudan.
</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link href="/agenda"><Calendar className="mr-2 h-4 w-4"/> Agenda tu sesión</Link></Button>
              <Button variant="ghost" asChild><Link href="#newsletter"><ArrowRight className="mr-2 h-4 w-4"/> Descarga una guía gratis</Link></Button>
            </div>
            <div className="flex gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><BookOpen className="h-4 w-4"/> CBT breve</div>
              <div className="flex items-center gap-2"><ShoppingBag className="h-4 w-4"/> Recursos descargables</div>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-8 shadow-sm border">
            <h3 className="text-xl font-medium mb-4">¿Qué te gustaría hacer hoy?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Button variant="secondary" asChild><Link href="/servicios">Ver servicios</Link></Button>
              <Button variant="secondary" asChild><Link href="/tienda">Explorar tienda</Link></Button>
              <Button variant="secondary" asChild><Link href="/blog">Leer el blog</Link></Button>
              <Button variant="secondary" asChild><Link href="/sobre-mi">Conocer al terapeuta</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recursos destacados</h2>
          <Button variant="ghost" asChild><Link href="/tienda">Ver todo</Link></Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Últimos del blog</h2>
          <Button variant="ghost" asChild><Link href="/blog">Ver blog</Link></Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <PostCard title="La verdad sobre dejar de procrastinar" href="/blog/procrastinacion" />
          <PostCard title="¿Los libros de autoayuda realmente funcionan?" href="/blog/autoayuda-funciona" />
          <PostCard title="Mini-test: ¿tienes burnout académico?" href="/blog/burnout-mini-test" />
        </div>
      </section>

      <section id="newsletter" className="container py-16">
        <div className="container-narrow bg-card border rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-2">Recibe herramientas que sí ayudan</h3>
          <p className="text-muted-foreground mb-6">Un correo a la semana. Sin spam. Incluye recursos descargables.</p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
export type Recurso = {
  id: string
  title: string
  description: string
  price: number
  currency: 'MXN'
  image: string
  href: string
}

export const recursos: Recurso[] = [
  {
    id: 'apagar-mente',
    title: 'Cómo Apagar tu Mente',
    description: 'Workbook práctico para calmar el sobrepensamiento con técnicas simples y efectivas.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/apagar-mente.png',
    href: '/manuales/como-apagar-tu-mente.pdf'
  },
  {
    id: 'arte-creer-en-ti',
    title: 'El Arte de Creer en Ti',
    description: 'Estrategias y ejercicios para fortalecer tu autoestima y confianza personal.',
    price: 249,
    currency: 'MXN',
    image: '/manuales/el-arte-de-creer-en-ti.png',
    href: '/manuales/el-arte-de-creer-en-ti.pdf'
  }
]

  
}
