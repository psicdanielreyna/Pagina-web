import Link from "next/link";
import Image from "next/image";
import { getPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog — Daniel Reyna",
  description: "Notas, reflexiones y herramientas prácticas.",
};

export default function BlogIndexPage() {
  const posts = getPostsMeta();

  return (
    <main className="container py-10">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            {/* Cabecera compacta con imagen a la izquierda en desktop */}
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
              {post.image && (
                <div className="md:shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={320}
                    height={200}
                    sizes="(min-width: 1024px) 320px, 90vw"
                    className="rounded-xl object-cover w-[320px] h-[200px] max-w-full"
                  />
                </div>
              )}

              <div className="flex-1">
                <h2 className="text-2xl md:text-[28px] font-semibold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {post.date && (
                  <p className="text-sm opacity-70 mt-1">
                    {new Date(post.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}

                {post.description && (
                  <p className="mt-3 text-base opacity-90">
                    {post.description}
                  </p>
                )}

                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-sm font-medium underline underline-offset-4"
                  >
                    Página del artículo →
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
