// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

const posts: Post[] = [
  {
    slug: "apagar-mente",
    title: "Post 1",
    date: "8/10/2025",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 1",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "Post 2",
    date: "8/05/2025",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 2",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Post 3",
    date: "7/28/2025",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 3",
  },
];

export default function BlogPage() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Blog</h1>
          <p className="mt-2 text-slate-600">
            Lecturas breves y aplicables para sentirte mejor.
          </p>
        </header>

        <div className="space-y-4">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:bg-slate-50 transition"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              </div>

              <div className="min-w-0">
                <h2 className="font-semibold text-slate-900">{p.title}</h2>
                <p className="text-xs text-slate-500">{p.date}</p>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
