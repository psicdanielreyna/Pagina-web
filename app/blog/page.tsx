// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";

// Listado simple; títulos renombrados a Post 1, Post 2, Post 3
const posts = [
  {
    title: "Post 1",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/como-apagar-tu-mente.webp",
    alt: "Post 1",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    date: "08/10/2025",
  },
  {
    title: "Post 2",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.webp",
    alt: "Post 2",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    date: "08/05/2025",
  },
  {
    title: "Post 3",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-en-3-pasos.webp",
    alt: "Post 3",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    date: "07/28/2025",
  },
];

export default function BlogPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Blog</h1>
        <p className="text-slate-600 mb-8">
          Lecturas breves y aplicables para sentirte mejor.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition"
            >
              <div className="relative h-56 w-full bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={p.title === "Post 1"}
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-slate-500">{p.date}</p>
                <h3 className="mt-1 font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-slate-600 text-sm line-clamp-3">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
