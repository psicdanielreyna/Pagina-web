// /app/page.tsx
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
  // toma 2 recursos para portada
  const destacados = recursos.slice(0, 2)

  // ordena posts por fecha DESC y toma 3
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
          <div className="space-y-4">
            <span className="inline-block text-sm tracking-wide text-blue-700/80">
              Psicoterapia | Recursos prácticos
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">
              Daniel Reyna — Acompañamiento con herramientas claras y humanas
            </h1>
            <p className="text-neutral-700">
              Sesiones individuales y de pareja, y materiales descargables para
              avanzar a tu ritmo.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/agendar"
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

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border">
            <Image
              src="/hero.jpg"
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
                href={`/tienda/${r.slug}`}
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
  image = "/blog/placeholder.jpg",
}: {
  slug: string
  title: string
  excerpt: string
  image?: string
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl overflow-hidden border hover:shadow-xl transition"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 900px, 100vw"
          priority
        />
      </div>
      <div className="p-6 space-y-2 bg-white">
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
        <p className="text-neutral-700">{excerpt}</p>
        <span className="inline-block text-sm text-blue-600 mt-1">Leer más →</span>
      </div>
    </Link>
  )
}

function MiniBlock({
  slug,
  title,
  excerpt,
  image = "/blog/placeholder.jpg",
}: {
  slug: string
  title: string
  excerpt: string
  image?: string
}) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group grid grid-cols-5 gap-3 rounded-xl overflow-hidden border hover:shadow-md transition"
    >
      <div className="relative col-span-2 aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 280px, 50vw"
        />
      </div>
      <div className="col-span-3 p-4 space-y-1 bg-white">
        <h4 className="text-base font-semibold">{title}</h4>
        <p className="text-sm text-neutral-600 line-clamp-3">{excerpt}</p>
        <span className="inline-block text-sm text-blue-600 mt-1">Leer más →</span>
      </div>
    </Link>
  )
}
