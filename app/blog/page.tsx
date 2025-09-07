import Link from "next/link";
import { getPostsMeta } from "@/lib/posts";

export const revalidate = 60; // ISR: rehidrata cada minuto

export default function BlogIndex() {
  const posts = getPostsMeta();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.length === 0 && <p>No hay publicaciones aún.</p>}

      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border rounded-xl p-5 hover:shadow-sm">
            <Link href={`/blog/${p.slug}`} className="block">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-neutral-500">{new Date(p.date).toLocaleDateString("es-MX")}</p>
              {p.description && <p className="mt-2 text-neutral-700">{p.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}