// app/blog/page.tsx
import HeroBanner from "@/components/HeroBanner";
import { getPublishedPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const revalidate = 1800;

export const metadata = {
  title: "Blog",
  description: "Artículos claros y prácticos sobre salud mental, hábitos y bienestar.",
};

type BlogSearchParams = { q?: string; page?: string };

export default async function BlogPage({ searchParams }: { searchParams?: BlogSearchParams }) {
  const q = (searchParams?.q ?? "").toString().toLowerCase().trim();
  const page = Number(searchParams?.page ?? 1);
  const PAGE_SIZE = 10;

  const posts = (await getPublishedPosts()).filter((p) => {
    if (!q) return true;
    const byTitle = (p.title ?? "").toLowerCase().includes(q);
    const byTags = ((p.tags ?? []).join(" ").toLowerCase()).includes(q);
    return byTitle || byTags;
  });

  const total = posts.length;
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <HeroBanner
        badge="Blog"
        title="Blog de Psicología"
        subtitle="Ideas claras y aplicables sobre ansiedad, estrés y bienestar emocional."
        accentText="Nuevo cada semana"
        accentSub="Cada lunes a las 10am un artículo nuevo para cuidar tu mente."
      />

      <main className="mx-auto max-w-4xl px-4 py-10">
        <form className="mb-6">
          <input
            defaultValue={q}
            name="q"
            placeholder="Buscar en el blog…"
            className="w-full rounded-xl border border-black/8 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-emerald-400"
            style={{ background: "#F8F5F0" }}
          />
        </form>

        {slice.length === 0 ? (
          <p className="text-zinc-500 text-sm">No se encontraron artículos.</p>
        ) : (
          <ul className="space-y-8">
            {slice.map((meta) => (
              <li key={meta.slug}>
                <PostCard meta={meta} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-center justify-between text-sm text-zinc-500">
          {page > 1 ? (
            <a className="hover:text-zinc-900 transition-colors" href={`/blog?page=${page - 1}&q=${encodeURIComponent(q)}`}>
              ← Anterior
            </a>
          ) : (
            <span />
          )}
          {page * PAGE_SIZE < total ? (
            <a className="hover:text-zinc-900 transition-colors" href={`/blog?page=${page + 1}&q=${encodeURIComponent(q)}`}>
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