// app/blog/scroll/page.tsx
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/blog";
import { compileMDX } from "next-mdx-remote/rsc";

type Post = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string; // <- opcional
  content: string;
};

const toTime = (d?: string) => (d ? new Date(d).getTime() : 0);

export default async function BlogScroll() {
  // ordena del más nuevo al más viejo
  const ordered = (posts as Post[])
    .slice()
    .sort((a, b) => (toTime(b.date) - toTime(a.date)));

  return (
    <main className="container max-w-3xl mx-auto px-4 py-10">
      <header className="mb-10">
        <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
          ← Volver al blog
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Lecturas continuas</h1>
        <p className="text-muted-foreground">
          Recorre los artículos uno tras otro, como una revista.
        </p>
      </header>

      <div className="space-y-20">
        {await Promise.all(
          ordered.map(async (p, idx) => {
            // compila el MDX de cada post
            const { content } = await compileMDX<{ }>(
              { source: p.content }
            );

            return (
              <article key={p.slug} className="scroll-mt-24">
                {/* título y meta */}
                <header className="mb-4">
                  <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                    {p.title}
                  </h2>
                  {p.date && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(p.date).toLocaleDateString("es-MX", {
                        dateStyle: "long",
                      })}
                    </p>
                  )}
                  {p.excerpt && (
                    <p className="text-muted-foreground mt-2">{p.excerpt}</p>
                  )}
                </header>

                {/* portada opcional */}
                {p.cover && (
                  <div className="my-6">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      width={1200}
                      height={630}
                      className="w-full h-auto rounded-xl object-cover"
                      priority={idx === 0}
                    />
                  </div>
                )}

                {/* cuerpo MDX */}
                <div className="prose prose-neutral max-w-none prose-headings:scroll-mt-24">
                  {content}
                </div>

                {/* separador visual hacia el siguiente post */}
                {idx < ordered.length - 1 && (
                  <div className="my-10 border-t pt-8 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Siguiente artículo</span>
                    <Link
                      href={`#${ordered[idx + 1].slug}`}
                      className="font-medium hover:underline"
                    >
                      {ordered[idx + 1].title}
                    </Link>
                  </div>
                )}

                {/* ancla para navegación interna */}
                <div id={p.slug} />
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}