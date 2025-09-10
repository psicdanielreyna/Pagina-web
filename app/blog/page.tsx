// app/blog/page.tsx
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export default function BlogPage() {
  const posts = getAllPosts(); // ya hace sort + filtra borradores
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen">Blog</h1>
      <div className="space-y-6">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
