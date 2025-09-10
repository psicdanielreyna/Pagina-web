// app/blog/page.tsx
import { getAllPostsMeta } from "@/lib/posts";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";

export const metadata = {
  title: "Blog",
  description:
    "Ideas claras y prácticas sobre bienestar psicológico, hábitos y vida cotidiana.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  // Seguridad: no crashear si no hay posts
  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-6 text-4xl font-extrabold text-evergreen">Blog</h1>
        <p className="text-gray-600">
          No hay publicaciones disponibles por ahora.{" "}
          <Link href="/" className="underline">Volver al inicio</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-extrabold text-evergreen">Blog</h1>

      <div className="space-y-6">
        {posts.map((p) => (
          <PostCard
            key={p.slug}
            post={{
              slug: p.slug,
              title: p.title,
              // estos dos son opcionales en nuestro parser
              excerpt: p.excerpt ?? "",
              date: p.date,
              cover: p.cover ?? undefined,
            }}
          />
        ))}
      </div>

      {/* ÚNICO newsletter al final de la página */}
      <section aria-labelledby="newsletter" className="mt-16">
        <div className="rounded-2xl bg-white/70 ring-1 ring-black/5 p-6 md:p-8 shadow-sm">
          <h2
            id="newsletter"
            className="text-center text-2xl md:text-3xl font-extrabold text-evergreen"
          >
            Suscríbete al newsletter
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Consejos breves y prácticos para sentirte mejor. Sin spam.
          </p>
          <div className="mx-auto mt-6 max-w-2xl">
            {/* tu componente */}
            <div className="rounded-xl border bg-white/70 p-4 md:p-6">
              {/* @ts-expect-error Server Component */}
              <newsletter-form />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
