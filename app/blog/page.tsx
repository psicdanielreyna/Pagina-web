// app/blog/page.tsx
import HeroBanner from "@/components/HeroBanner";
import { getAllPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description: "Artículos claros y prácticos sobre salud mental, hábitos y bienestar.",
};

type BlogSearchParams = { q?: string; page?: string };

export default async function BlogPage({ searchParams }: { searchParams?: BlogSearchParams }) {
  const q = (searchParams?.q ?? "").toString().toLowerCase().trim();
  const page = Number(searchParams?.page ?? 1);
  const PAGE_SIZE = 10;

  const posts = (await getAllPostsMeta()).filter((p) => {
    if (!q) return true;
    const byTitle = (p.title ?? "").toLowerCase().includes(q);
    const byTags = ((p.tags ?? []).join(" ").toLowerCase()).includes(q);
    return byTitle || byTags;
  });

  const total = posts.length;
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Hero con imagen */}
      <HeroBanner
        badge="Blog"
        title="Blog de Psicología"
        subtitle="Psicología aplicada a tu vida, en un solo lugar."
        imageUrl="/hero-blog.jpg" // cámbiala si usas otra ruta en /public
      />

      {/* Bloque descriptivo bajo el hero */}
      <section className="bg-[#F5E7D9] py-12">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="text-lg text-zinc-700">
            Aquí encontrarás artículos diseñados para acompañarte en tu camino de
            autoconocimiento, manejar tus emociones y construir relaciones más sanas.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
            Nuevo artículo cada semana, Lunes a las 10:00am
          </div>
        </div>
      </section>

      {/* Lista y buscador */}
      <main className="mx-auto max-w-4xl px-4 py-10">
        <form className="mb-6">
          <input
            defaultValue={q}
            name="q"
            placeholder="Buscar en el blog…"
            className="w-full rounded-md border px-3 py-2"
          />
        </form>

        {slice.length === 0 ? (
          <p className="text-zinc-600">No se encontraron artículos.</p>
        ) : (
          <ul className="space-y-8">
            {slice.map((meta) => (
              <li key={meta.slug}>
                <PostCard meta={meta} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center justify-between">
          {page > 1 ? (
            <a className="underline" href={`/blog?page=${page - 1}&q=${encodeURIComponent(q)}`}>
              ← Anterior
            </a>
          ) : (
            <span />
          )}
          {page * PAGE_SIZE < total ? (
            <a className="underline" href={`/blog?page=${page + 1}&q=${encodeURIComponent(q)}`}>
              Siguiente →
            </a>
          ) : (
            <span />
          )}
        </div>
      </main>
    </>
  );
}