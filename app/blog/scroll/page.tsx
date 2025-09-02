import posts from "@/data/blog";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog — Lectura continua",
  description: "Lee los artículos de forma continua",
};

const toTime = (d?: string) => (d ? new Date(d).getTime() : 0);

export default function BlogScroll() {
  const ordered = [...posts].sort((a, b) => (toTime(a.date) < toTime(b.date) ? 1 : -1));

  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/blog" className="underline">
          ← Volver al listado
        </Link>
      </nav>

      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      {ordered.map((p, idx) => (
        <article key={p.slug} className="prose prose-neutral dark:prose-invert max-w-none">
          <header className="mb-6">
            <h2 className="mb-1 text-2xl font-semibold">
              <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            </h2>

            {p.date && (
              <p className="text-sm text-muted-foreground">
                {new Date(p.date).toLocaleDateString("es-MX", { dateStyle: "long" })}
              </p>
            )}

            {p.cover && (
              <Image
                src={p.cover}
                alt={p.title}
                width={1200}
                height={630}
                className="my-4 h-auto w-full rounded-lg object-cover"
              />
            )}
          </header>

          {p.excerpt && <p className="mb-6">{p.excerpt}</p>}

          <p className="mb-12">
            <Link href={`/blog/${p.slug}`} className="text-primary underline">
              Leer este artículo completo →
            </Link>
          </p>

          {idx < ordered.length - 1 && <hr className="my-12" />}
        </article>
      ))}
    </main>
  );
}