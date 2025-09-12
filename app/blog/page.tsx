// app/blog/page.tsx
import { getAllPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description:
    "Artículos claros y prácticos sobre salud mental, hábitos y bienestar.",
};

type BlogSearchParams = { q?: string; page?: string };

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: BlogSearchParams;
}) {
  const q = (searchParams?.q ?? "").toString().toLowerCase();
  const page = Number(searchParams?.page ?? 1);
  const PAGE_SIZE = 10;

  const posts = (await getAllPostsMeta()).filter((p) => {
    const byTitle = p.title?.toLowerCase().includes(q);
    const byTags = (p.tags ?? []).join(" ").toLowerCase().includes(q);
    return !q || byTitle || byTags;
  });

  const total = posts.length;
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <form className="mb-6">
        <input
          defaultValue={q}
          name="q"
          placeholder="Buscar en el blog…"
          className="w-full rounded-md border px-3 py-2"
        />
      </form>

      <ul className="space-y-8">
        {slice.map((meta) => (
          <li key={meta.slug}>
            <PostCard meta={meta} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between">
        {page > 1 ? (
          <a
            className="underline"
            href={`/blog?page=${page - 1}&q=${encodeURIComponent(q)}`}
          >
            ← Anterior
          </a>
        ) : (
          <span />
        )}
        {page * PAGE_SIZE < total ? (
          <a
            className="underline"
            href={`/blog?page=${page + 1}&q=${encodeURIComponent(q)}`}
          >
            Siguiente →
          </a>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
