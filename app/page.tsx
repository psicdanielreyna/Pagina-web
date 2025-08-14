// app/page.tsx
import Link from "next/link"
import Image from "next/image"
import ProductCard from "@/components/product-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { recursos } from "@/data/recursos"

export default function HomePage() {
  // Si quieres destacar sólo algunos recursos, selecciona aquí
  const destacados = recursos.slice(0, 2)

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="pt-8 md:pt-12">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Bienvenido a <span className="whitespace-nowrap">Daniel Reyna — Psicólogo</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Recursos prácticos y herramientas para tu bienestar.
          </p>
        </div>
      </section>

      {/* RECURSOS DESTACADOS */}
      <section className="pb-4">
        <div className="container mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Recursos destacados</h2>
            <Link
              href="/tienda"
              className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Ver todo
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {destacados.map((r) => (
              <ProductCard
                key={r.slug}
                title={r.title}
                description={r.description}
                href={`/tienda/${r.slug}`}
                image={r.image}
                price={r.price}
                currency="MXN"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ÚLTIMOS ARTÍCULOS (se mantiene igual a como lo tenías) */}
      {/* Si ya tenías este bloque en tu página anterior y usa otra fuente de datos,
          puedes dejarlo tal cual. Sólo lo envolvemos en container para consistencia. */}
      <section>
        <div className="container mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">Últimos artículos</h2>
            <Link
              href="/blog"
              className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Ver blog
            </Link>
          </div>

          {/* Deja aquí tu grid de posts existente */}
          {/* Ejemplo de placeholder (borra si ya tienes tu listado de posts renderizado): */}
          {/* <div className="grid gap-6 md:grid-cols-2">
            <ArticleCard ... />
            <ArticleCard ... />
          </div> */}
        </div>
      </section>

      {/* NEWSLETTER CENTRADO ABAJO */}
      <section className="py-10 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-2xl md:text-3xl font-semibold">Suscríbete al newsletter</h2>
              <p className="mt-2 text-muted-foreground">
                Recibe herramientas y artículos breves para tu salud mental.
              </p>

              {/* wrapper para centrar el formulario si su contenido es ancho */}
              <div className="mt-6 flex justify-center">
                <div className="w-full">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
