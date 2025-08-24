// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import groq from "groq";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";

export const revalidate = 60;

type PostCard = {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt: string;
  cover?: any;
};

const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  excerpt,
  "slug": slug.current,
  publishedAt,
  cover
}`;

export default async function BlogPage() {
  const posts = await client.fetch<PostCard[]>(POSTS_QUERY);

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Blog</h1>
          <p className="mt-2 text-slate-600">Lecturas breves y aplicables para sentirte mejor.</p>
        </header>

        <div className="space-y-4">
          {posts.map((p) => {
            const img = p.cover ? urlFor(p.cover).width(160).height(160).fit("crop").url() : null;
            return (
              <Link
                key={p._id}
                href={`/blog/${p.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:bg-slate-50 transition"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {img && (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-900">{p.title}</h2>
                  <p className="text-xs text-slate-500">
                    {new Date(p.publishedAt).toLocaleDateString()}
                  </p>
                  {p.excerpt && (
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
