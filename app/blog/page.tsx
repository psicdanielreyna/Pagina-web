// app/blog/page.tsx
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog | Daniel Reyna",
  description: "Reflexiones, artículos y recursos de psicología.",
};

export default async function BlogPage() {
  const posts = await getPostsMeta();

  if (!posts || posts.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-neutral-600">No hay artículos todavía.</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 transition"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-neutral-500">
              {new Date(post.date).toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-3 text-neutral-700">{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Leer más →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}