// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog | Daniel Reyna",
  description: "Entradas del blog de psicología y bienestar",
};

export default function BlogPage() {
  const posts = getPostsMeta();

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6">Blog</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            {post.image && (
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative mb-4 overflow-hidden rounded-lg aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={false}
                  />
                </div>
              </Link>
            )}

            <h2 className="text-xl font-bold leading-tight">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {new Date(post.date).toUTCString()}
            </p>

            {post.description && (
              <p className="mt-3 text-gray-700">
                {post.description}
              </p>
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