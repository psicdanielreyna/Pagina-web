// app/blog/page.tsx
import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog | Daniel Reyna",
  description: "Entradas del blog de psicología y bienestar",
};

export default function BlogPage() {
  const posts = getPostsMeta();
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            {post.date && (
              <p className="mt-1 text-sm text-gray-500">{post.date}</p>
            )}
            {post.description && (
              <p className="mt-2 text-gray-700">{post.description}</p>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-green-700 hover:underline"
            >
              Página del artículo…
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}