// app/blog/page.tsx
import { getPostsMeta } from "@/lib/posts";
import { PostCard, type CardPost } from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description: "Artículos sobre salud mental y herramientas prácticas.",
};

export default async function BlogIndexPage() {
  const posts = await getPostsMeta();

  // Normalizamos PostMeta → CardPost
  const cards: CardPost[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.description ?? "",   // usamos la description del frontmatter
    date: p.date ?? "",
    cover: (p as any).image ?? null, // PostMeta.image → cover
  }));

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen mb-6">
        Blog
      </h1>

      {/* Lista de posts */}
      <section className="space-y-6">
        {cards.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
