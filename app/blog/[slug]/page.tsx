// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getSlugs, getPostBySlug } from "@/lib/posts";
import { compileMDX } from "next-mdx-remote/rsc"; // no necesita provider

export const dynamic = "error"; // para SSG/ISR consistentes

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: { slug: string } };

export default async function BlogPostPage({ params }: Params) {
  const { slug } = params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return notFound();

    // renderiza el contenido MDX (el frontmatter ya lo parseamos con gray-matter)
    const { content } = await compileMDX<{}>
      ({ source: post.content, options: { parseFrontmatter: false } });

    const { title, date, cover } = post.frontMatter;

    return (
      <article className="prose prose-zinc max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{title}</h1>
          {date && (
            <time dateTime={date} className="text-sm text-muted-foreground">
              {new Date(date).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {cover ? (
            // si ya usas next/image, cámbialo a <Image .../>
            <img
              src={cover}
              alt={title}
              className="mt-6 rounded-xl border"
              width={1200}
              height={630}
            />
          ) : null}
        </header>

        {/* Contenido MDX */}
        <div className="prose">{content}</div>
      </article>
    );
  } catch {
    return notFound();
  }
}
