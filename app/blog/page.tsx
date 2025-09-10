// app/blog/page.tsx
import { getAllPostsMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description:
    "Artículos claros y prácticos sobre salud mental, hábitos y bienestar.",
};

export default async function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="container mx-auto max-w-6xl px-4 md:px-6 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-evergreen mb-8">
        Blog
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-700">Aún no hay artículos publicados.</p>
      ) : (
        <section className="space-y-6">
          {posts.map((p) => (
            <PostCard
              key={p.slug}
              post={{
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt ?? "",
                date: p.date ?? "", // asegura string
                cover: p.cover ?? undefined,
              }}
            />
          ))}
        </section>
      )}
    </main>
  );
}
