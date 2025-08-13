// app/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { recursos } from "@/data/recursos"

export const metadata: Metadata = {
  title: "Inicio — Daniel Reyna, Psicólogo",
  description:
    "Recursos prácticos, artículos y herramientas de psicoterapia. Bienvenido a PsicoToolKit por Daniel Reyna.",
}

export default function HomePage() {
  // Toma 2 productos destacados
  const destacados = recursos.slice(0, 2)

  // 👇 Ejemplo de últimas entradas (si ya tienes un sistema de posts/MDX,
  // sustitúyelo por tu import real).
  const posts = [
    {
      slug: "como-detener-el-sobrepensamiento",
      title: "Cómo detener el sobrepensamiento",
      excerpt: "Pasos simples para enfriar la mente en momentos de rumiación.",
      date: "2025-08-01",
    },
    {
      slug: "autocuidado-en-semanas-complicadas",
      title: "Autocuidado en semanas complicadas",
      excerpt:
        "Micro-hábitos para sostenerte cuando el tiempo y la energía no alcanzan.",
      date: "2025-07-24",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-10 space-y-14">
      {/* Hero */}
      <section className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Bienvenido a PsicoToolKit
        </h1>
        <p className="text-muted-foreground text-lg">
          Recursos prácticos y herramientas para tu bienestar.
        </p>
      </section>

      {/* Recursos destacados */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recursos destacados</h2>
          <Button asChild variant="outline">
            <Link href="/tienda">Ver todo</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {destacados.map((r) => (
            <ProductCard
              key={r.slug}
              title={r.title}
              description={r.description}
              price={r.price}
              image={r.image}
              href={`/tienda/${r.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Blog (scroll / grid simple) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Últimos artículos</h2>
          <Button asChild variant="outline">
            <Link href="/blog">Ver blog</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="rounded-xl border p-5 hover:shadow-sm transition"
            >
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.excerpt}</p>
              <div className="text-xs text-muted-foreground mb-4">{p.date}</div>
              <Button asChild size="sm">
                <Link href={`/blog/${p.slug}`}>Leer</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Suscríbete al newsletter</h2>
        <p className="text-muted-foreground">
          Recibe herramientas y artículos breves para tu salud mental.
        </p>
        <div className="max-w-xl">
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
