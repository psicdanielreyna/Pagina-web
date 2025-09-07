// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getPostsMeta, getPostHtml } from "@/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Artículos y recursos recientes.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

async function getExcerpt(slug: string, fallback?: string) {
  if (fallback && fallback.trim().length > 0) return fallback.trim();
  // Si no hay description en el frontmatter, generamos uno del body:
  try {
    const { html } = await getPostHtml(slug);
    const text = html
      .replace(/<[^>]+>/g, " ") // quita tags
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, 220) + (text.length > 220 ? "…" : "");
  } catch {
    return "";
  }
}

export default async function BlogIndex() {
  const posts = await getPostsMeta(); // debe devolver: { slug, title, date, description?, image? }[]

  // Preparamos excerpts (evita N+1 extremo porque solo hay unos cuantos posts)
  const withExcerpts = await Promise.all(
    posts.map(async (p) => ({
      ...p,
      excerpt: await getExcerpt(p.slug, p.description),
    }))
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
        Blog
      </h1>

      <ul className="space-y-8">
        {withExcerpts.map((post) => (
          <li key={post.slug}>
            <article className="rounded-xl border border-neutral-200/70 bg-white shadow-sm hover:shadow-md transition-shadow">
              {post.image && (
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </Link>
              )}

              <div className="p-5 sm:p-6">
                <header className="mb-2">
                  <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline underline-offset-2"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.date && (
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatDate(post.date)}
                    </p>
                  )}
                </header>

                {post.excerpt && (
                  <p className="text-neutral-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-green-700 hover:text-green-800 font-medium underline underline-offset-4"
                  >
                    Página del artículo…
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}