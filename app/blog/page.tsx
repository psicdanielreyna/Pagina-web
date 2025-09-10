// app/blog/page.tsx
import { getAllPostsMeta } from "@/lib/posts";
import { PostCard, type CardPost } from "@/components/PostCard";

export const metadata = {
  title: "Blog — Daniel Reyna",
  description: "Artículos para sentirte mejor con herramientas claras y prácticas.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto max-w-6xl px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen">Blog</h1>
        <p className="mt-3 text-gray-700">Aún no hay artículos publicados.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 md:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen">Blog</h1>
        <p className="mt-2 text-gray-700">
          Lecturas breves con herramientas prácticas de psicología.
        </p>
      </header>

      <section className="space-y-6">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            post={
              {
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt ?? "",       // fallback
                date: p.date ?? "",              // <<< AQUÍ el fix importante
                cover: p.cover ?? undefined,
              } satisfies CardPost
            }
          />
        ))}
      </section>
    </main>
  );
}
