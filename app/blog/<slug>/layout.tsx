// app/blog/[slug]/layout.tsx
import Link from "next/link";
import type { ReactNode } from "react";

export default function BlogPostLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* breadcrumb simple */}
      <nav className="mb-6 text-sm">
        <Link href="/blog" className="text-blue-600 hover:underline">
          ← Volver al blog
        </Link>
      </nav>

      {/* cuerpo del post */}
      <article className="prose prose-neutral max-w-3xl mx-auto prose-img:rounded-xl prose-a:text-blue-600">
        {children}
      </article>
    </main>
  );
}
