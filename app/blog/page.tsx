// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";

type BlogItem = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  date: string;
  img: string;
  alt: string;
};

const blog: BlogItem[] = [
  {
    slug: "apagar-mente",
    title: "Post 1",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    href: "/blog/como-apagar-tu-mente",
    date: "8/10/2025",
    img: "/images/blog/apagar-mente.png",
    alt: "Post 1",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "Post 2",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    href: "/blog/el-arte-de-creer-en-ti",
    date: "8/05/2025",
    img: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Post 2",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Post 3",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    href: "/blog/ansiedad-en-3-pasos",
    date: "7/28/2025",
    img: "/images/blog/ansiedad-3-pasos.png",
    alt: "Post 3",
  },
];

export default function BlogPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Blog
        </h1>
        <p className="text-slate-600 mb-8">
          Lecturas breves y aplicables para sentirte mejor.
        </p>

        <div className="space-y-6">
          {blog.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-4 items-center rounded-2xl border border-slate-100 bg-white p-4 hover:bg-slate-50 transition"
            >
              <div className="relative h-[90px] md:h-[120px] w-full rounded-lg overflow-hidden bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500">{p.date}</p>
                <p className="mt-1 text-slate-600 text-sm">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
