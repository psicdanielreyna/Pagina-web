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
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-10">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border rounded-xl p-6 hover:shadow-md transition"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={420}
                className="rounded-lg w-full max-w-[800px] h-auto object-cover mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
            <p className="text-muted-foreground mb-3">
              {post.description?.slice(0, 180) ?? "…"}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-primary font-medium hover:underline"
            >
              Página del artículo →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}