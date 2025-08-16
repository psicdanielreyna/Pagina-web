// app/page.tsx
import Image from "next/image"
import Link from "next/link"

import ProductCard from "@/components/product-card"
import NewsletterForm from "@/components/newsletter-form"

import recursos from "@/data/recursos"
import posts from "@/data/posts"

// SEO
export const metadata = {
  title: "Daniel Reyna — Psicoterapia & Recursos",
  description:
    "Psicoterapia individual y de pareja. Recursos prácticos para ansiedad, autoestima y bienestar.",
}

export default function HomePage() {
  // Toma 2 recursos para portada
  const destacados = recursos.slice(0, 2)

  // Ordena posts por fecha DESC y toma 3
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const [featured, ...rest] = sorted
  const secundarios = rest.slice(0, 2)

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="pt-8 md:pt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <nav className="text-sm tracking-wide text-blue-700/80 flex items-center gap-2">
              <Link href="/servicios" className="hover:underline">
                Psicoterapia
              </Link>
              <span aria-hidden="true">|</span>
              <Link href="/tienda" className="hover:underline">
                Recursos prácticos
              </Link>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold">
              Daniel Reyna — Acompañamiento con herramientas claras y humanas
            </h1>

            <p className="text-neutral-700">
              Sesiones individuales y de pareja, y materiales descargables para
              avanzar a tu ritmo.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/servicios"
                className="inline-flex items-center rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Agendar cita
              </Link>
              <Link
                href="/tienda"
                className="inline-flex items-center rounded-full px-4 py-2 border hover:bg-neutral-50 transition"
              >
                Ver tienda
              </Link>
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border">
            <Image
              src="/images/header.png"
              alt="Consulta y recursos de psicoterapia"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 600px, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* RECURSOS DESTACADOS */}
      <section>
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recursos destacados</h2>
            <Link href="/tienda" className="text-blue-600 hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacados.map((r) => (
              <ProductCard
                key={r.slug}
                title={r.title}
                description={r.description}
                image={r.image}
                price={r.price}
                // Si existe link de Mercado Pago, lo usamos; si no, caemos a la página interna
                href={r.href ?? `/tienda/${r.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG (1 grande + 2 a la derecha) */}
      <section>
        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Último del blog</h2>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Ver blog
            </Link>
          </div>

          {featured ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Post grande a la izquierda (ocupa 2 columnas en desktop) */}
              <div className="lg:col-span-2">
                <FeaturedBlock
                  slug={featured.slug}
                  title={featured.title}
                  excerpt={featured.excerpt}
                  image={featured.image}
                />
              </div>

              {/* Dos más a la derecha */}
              <div className="space-y-6">
                {secundarios.map((p) => (
                  <MiniBlock
                    key={p.slug}
                    slug={p.slug}
                    title={p.title}
                    excerpt={p.excerpt}
                    image={p.image}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-neutral-600">Aún no hay entradas publicadas.</p>
          )}
        </div>
      </section>

      {/* NEWSLETTER CENTRADO */}
      <section>
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center space-y-2 mb-4">
              <h2 className="text-2xl font-semibold">Newsletter</h2>
              <p className="text-neutral-600">
                Consejos breves y herramientas que sí puedes aplicar.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}

/* ====== Subcomponentes locales para la sección blog ====== */

function FeaturedBlock({
  slug,
  title,
  excerpt,
  image,
}: {
  slug: string
  title: string
  excerpt: string
  image?: string
}) {
  const imgSrc = image ?? `/blog/${slug}.jpg`
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl overflow-hidden border hover:shadow-sm transition"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 800px, 100vw"
        />
      </div>
      <div className="p-4 space-y-1">
        <h3 className="text-xl font-semibold group-hover:underline">{title}</h3>
        <p className="text-neutral-600">{excerpt}</p>
      </div>
    </Link>
  )
}

function MiniBlock({
  slug,
  title,
  excerpt,
  image,
}: {
  slug: string
  title: string
  excerpt: string
  image?: string
}) {
  const imgSrc = image ?? `/blog/${slug}.jpg`
  return (
    <Link
      href={`/blog/${slug}`}
      className="group grid grid-cols-[96px,1fr] gap-3 items-center rounded-xl overflow-hidden border p-2 hover:bg-neutral-50 transition"
    >
      <div className="relative w-[96px] h-[72px] rounded-md overflow-hidden bg-gray-50">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="120px"
        />
      </div>
      <div className="space-y-1">
        <h4 className="font-medium leading-snug group-hover:underline">
          {title}
        </h4>
        <p className="text-sm text-neutral-600 line-clamp-2">{excerpt}</p>
      </div>
    </Link>
  )
}
