// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="mb-4 text-4xl font-bold">Blog</h1>
      <p className="mb-8 text-muted-foreground">
        Lecturas breves y aplicables para sentirte mejor.
      </p>

      <ul className="space-y-4">
        {posts.map(({ slug, frontMatter }) => (
          <li key={slug} className="rounded-xl bg-muted/40 p-4">
            <Link href={`/blog/${slug}`} className="block">
              <h2 className="text-lg font-semibold">{frontMatter.title}</h2>
              {frontMatter.date && (
                <p className="text-xs text-muted-foreground">
                  {new Date(frontMatter.date).toLocaleDateString("es-MX")}
                </p>
              )}
              {frontMatter.excerpt && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {frontMatter.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
