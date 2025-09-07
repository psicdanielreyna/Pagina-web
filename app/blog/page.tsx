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
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            {post.image && (
              <div className="mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded-md object-cover"
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
            {post.description && <p className="text-gray-700 mb-4">{post.description}</p>}
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              Página del artículo →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}