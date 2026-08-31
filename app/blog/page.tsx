import { getPublishedPosts } from "@/lib/posts";
import { FeaturedPostCard, CompactPostCard } from "@/components/PostCard";

export const revalidate = 300;

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

  // En la primera página sin búsqueda, el primer post va como destacado
  const isFirstView = page === 1 && !q;
  const featured = isFirstView ? slice[0] : null;
  const rest = isFirstView ? slice.slice(1) : slice;

  return (
    <main style={{ background: "var(--bg-primary)" }} className="min-h-screen">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-tertiary)" }}>
              Blog
            </p>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
              Blog de Psicología
            </h1>
            <p className="text-sm max-w-md" style={{ color: "var(--text-secondary)" }}>
              Ideas claras y aplicables sobre ansiedad, estrés y bienestar emocional.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full w-fit shrink-0"
            style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Nuevo cada lunes 10am
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-12">
        {/* Buscador */}
        <form className="mb-6">
          <input
            defaultValue={q}
            name="q"
            placeholder="Buscar en el blog…"
            className="w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none"
            style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)", color: "var(--text-primary)" }}
          />
        </form>

        {slice.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No se encontraron artículos.</p>
        ) : (
          <>
            {/* Destacado */}
            {featured && (
              <div className="mb-4">
                <FeaturedPostCard meta={featured} />
              </div>
            )}

            {/* Grid del resto */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((meta) => (
                  <CompactPostCard key={meta.slug} meta={meta} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Paginación */}
        <div className="mt-10 flex items-center justify-between text-sm">
          {page > 1 ? (
            <a style={{ color: "var(--text-secondary)" }} href={`/blog?page=${page - 1}&q=${encodeURIComponent(q)}`}>← Anterior</a>
          ) : <span />}
          {page * PAGE_SIZE < total ? (
            <a style={{ color: "var(--text-secondary)" }} href={`/blog?page=${page + 1}&q=${encodeURIComponent(q)}`}>Siguiente →</a>
          ) : <span />}
        </div>
      </div>
    </main>
  );
}