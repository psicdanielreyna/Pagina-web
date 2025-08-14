// app/page.tsx
import Link from "next/link"
import Image from "next/image"
import { ProductCard } from "@/components/product-card"
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
      // app/page.tsx (solo la parte del blog)
async function getBlog() {
  const res = await fetch("/api/blog?limit=3", { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items as {
    title: string;
    link: string;
    date: string;
    excerpt: string;
    image?: string;
  }[];
}

export default async function HomePage() {
  const posts = await getBlog();

  return (
    <main className="...">
      {/* ...tu hero / recursos / newsletter... */}

      {/* --- Blog --- */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
    </main>
  );
}


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
