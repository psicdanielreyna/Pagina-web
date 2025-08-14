// app/page.tsx
import Image from "next/image"
import Link from "next/link"
import { recursos } from "@/data/recursos"
import { ProductCard } from "@/components/ProductCard"
import { NewsletterForm } from "@/components/NewsletterForm"


// Llama a nuestro endpoint serverless en Netlify (relativo)
async function getBlog() {
  try {
    const res = await fetch("/api/blog?limit=3", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return (data.items ?? []) as {
      title: string
      link: string
      date: string
      excerpt: string
      image?: string
    }[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const posts = await getBlog()
  const destacados = recursos.slice(0, 2)

  return (
    <main className="space-y-12">
      {/* HERO */}
      <section className="pt-8 md:pt-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Bienvenido a PsicoToolKit
          </h1>
          <p className="text-slate-600 mt-3 max-w-2xl">
            Recursos prácticos y herramientas para tu bienestar.
          </p>
        </div>
      </section>

      {/* RECURSOS DESTACADOS */}
      <section>
        <div className="container mx-auto px-4 flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recursos destacados</h2>
         {destacados.map((r) => (
  <ProductCard
    key={r.slug}
    slug={r.slug}
    title={r.title}
    description={r.description}
    image={r.image}
    price={r.price}
  />
))}

        </div>

        <div className="container mx-auto px-4 grid gap-6 sm:grid-cols-2">
          {destacados.map((r) => (
            <Link
              key={r.slug}
              href={`/tienda/${r.slug}`}
              className="rounded-xl border bg-white hover:shadow-md transition overflow-hidden"
            >
              {/* Imagen */}
              <div className="relative w-full h-64">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Texto */}
              <div className="p-4">
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                  {r.description}
                </p>
                <p className="mt-2 font-medium">MXN {r.price}.00</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOG: 1 grande + 2 a la derecha */}
      <section className="pb-4">
        <div className="container mx-auto px-4 flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Últimos artículos</h2>
          <a
            href="https://robertomtz.com"
            target="_blank"
            rel="noreferrer"
            className="text-teal-700 hover:underline"
          >
            Ver blog
          </a>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Principal grande */}
          <a
            href={posts[0]?.link ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="lg:col-span-2 rounded-xl border p-4 hover:shadow-md transition"
          >
            {posts[0]?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            ) : null}
            <h3 className="text-xl font-semibold mb-2">
              {posts[0]?.title ?? "Pronto habrá artículos"}
            </h3>
            <p className="text-slate-600 text-sm">
              {posts[0]?.excerpt ?? ""}
            </p>
            <p className="text-slate-400 text-xs mt-2">{posts[0]?.date}</p>
          </a>

          {/* Dos secundarias a la derecha */}
          <div className="flex flex-col gap-6">
            {posts.slice(1, 3).map((p) => (
              <a
                key={p.link}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border p-4 hover:shadow-md transition"
              >
                <h4 className="font-medium mb-1">{p.title}</h4>
                <p className="text-slate-600 text-sm line-clamp-3">
                  {p.excerpt}
                </p>
                <p className="text-slate-400 text-xs mt-2">{p.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER centrado abajo (si ya tienes componente, colócalo aquí) */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">
              Suscríbete al newsletter
            </h3>
            <p className="text-slate-600 mb-4">
              Recibe herramientas y artículos breves para tu salud mental.
            </p>
            {/* Sustituye este bloque por tu <NewsletterForm /> si ya existe */}
            <form
             <NewsletterForm />

            >
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-lg border px-3 py-2"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-teal-700 text-white px-4 py-2 hover:bg-teal-800"
              >
                Quiero recibirlo
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
