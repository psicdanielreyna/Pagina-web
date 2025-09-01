// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p>Próximamente…</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      <ul className="space-y-4">
        {posts.map(({ slug, meta }) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="block rounded-xl bg-neutral-50 hover:bg-neutral-100 p-4 transition"
            >
              <div className="flex items-start gap-4">
                {meta.cover ? (
                  <Image
                    src={meta.cover}
                    alt={meta.title}
                    width={72}
                    height={72}
                    className="rounded-md object-cover aspect-square"
                  />
                ) : null}

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {meta.title}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {formatDate(meta.date)}
                  </p>
                  {meta.excerpt ? (
                    <p className="mt-1 text-neutral-700 line-clamp-2">
                      {meta.excerpt}
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
