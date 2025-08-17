// app/page.tsx
import Image from "next/image";
import Link from "next/link";

import ProductCard from "@/components/product-card";
import NewsletterForm from "@/components/newsletter-form";

import recursos from "@/data/recursos";
import posts from "@/data/posts";

export const metadata = {
  title: "Inicio",
  description:
    "Psicoterapia individual y de pareja. Recursos prácticos para ansiedad, autoestima y bienestar.",
};

export default function HomePage() {
  const destacados = recursos.slice(0, 3);

  // blog: ordena por fecha y toma 1 destacado + 2 secundarios
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = sorted;
  const secundarios = rest.slice(0, 2);

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-block text-sm tracking-wide text-ink-mute">
                Psicoterapia | Recursos prácticos
              </span>
              <h1 className="text-4xl md:text-hero font-extrabold text-ink">
                Daniel Reyna — Acompañamiento con herramientas claras y humanas
              </h1>
              <p className="text-lg md:text-xl text-ink-soft">
                Sesiones individuales y de pareja, y materiales descargables
                para avanzar a tu ritmo.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/servicios" className="btn-primary">
                  Agendar cita
                </Link>
                <Link href="/tienda" className="btn-ghost">
                  Ver tienda
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border bg-white">
              <Image
                src="/images/daniel-reyna-hero.webp"
                alt="Consulta y recursos de psicoterapia"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 600px, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS DESTACADOS */}
      <section className="py-8">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-ink">Recursos destacados</h2>
              <Link href="/tienda" className="link">
                Ver todos
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destacados.map((r) => (
                <ProductCard
                  key={r.slug}
                  title={r.title}
                  description={r.description}
                  image={r.image}
                  price={r.price}
                  href={r.href ?? `/tienda/${r.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG (1 grande + 2 a la derecha) */}
      <section className="py-8">
        <div className="container">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-ink">Último del blog</h2>
              <Link href="/blog" className="link">
                Ver blog
              </Link>
            </div>

            {featured ? (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Post grande */}
                <article className="lg:col-span-2 card overflow-hidden">
                  <Link href={`/blog/${featured.slug}`} className="block relative aspect-[16/9]">
                    <Image
                      src={featured.image ?? "/images/post-fallback.jpg"}
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-ink mb-2">
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </h3>
                    <p className="text-ink-soft">{featured.excerpt}</p>
                  </div>
                </article>

                {/* Dos más a la derecha */}
                <div className="space-y-6">
                  {secundarios.map((p) => (
                    <article key={p.slug} className="card overflow-hidden">
                      <Link href={`/blog/${p.slug}`} className="block relative aspect-[16/9]">
                        <Image
                          src={p.image ?? "/images/post-fallback.jpg"}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-ink mb-1">
                          <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                        </h4>
                        <p className="text-ink-soft line-clamp-2">{p.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-ink-mute">Aún no hay entradas publicadas.</p>
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CENTRADO */}
      <section className="section-soft py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-xl text-center space-y-4">
            <h2 className="text-2xl font-semibold text-ink">Newsletter</h2>
            <p className="text-ink-soft">
              Consejos breves y herramientas que sí puedes aplicar.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
