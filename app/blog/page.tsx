// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import groq from "groq";

type PostCard = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  date?: string;
  cover?: any;
};

const query = groq`*[_type == "post"] | order(date desc)[0...12]{
  _id, title, slug, excerpt, date, cover
}`;

export default async function BlogPage() {
  const posts = await sanityClient.fetch<PostCard[]>(query);

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Blog</h1>
          <p className="mt-2 text-slate-600">Lecturas breves y aplicables para sentirte mejor.</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p._id}
              href={`/blog/${p.slug.current}`}
              className="rounded-2xl border border-slate-100 bg-white overflow-hidden hover:bg-slate-50 transition"
            >
              <div className="relative h-44 bg-slate-50">
                {p.cover && (
                  <Image
                    src={urlFor(p.cover).width(800).height(400).fit("crop").url()}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-slate-900">{p.title}</h2>
                {p.date && <p className="text-xs text-slate-500 mt-0.5">{new Date(p.date).toLocaleDateString()}</p>}
                {p.excerpt && <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
