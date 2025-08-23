// components/BlogHome.tsx
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import { client } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";

const query = groq`*[_type=="post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  title, excerpt, "slug": slug.current, mainImage
}`;

export default async function BlogHome() {
  const posts: any[] = await client.fetch(query).catch(() => []);
  if (!posts?.length) return null; // 🔹 No hay posts → no pintar sección

  const [destacado, ...resto] = posts;
  return (
    <section className="py-10 md:py-14">
      {/* ...título y “Ver blog”... */}

      <div className="grid md:grid-cols-[1fr,380px] gap-6">
        {/* Grande a la izquierda */}
        <Link href={`/blog/${destacado.slug}`} className="block">
          <div className="rounded-2xl bg-muted/50 p-0 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={destacado.mainImage ? urlFor(destacado.mainImage).width(900).height(560).url() : "/placeholder.png"}
                alt={destacado.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg">{destacado.title}</h3>
              {destacado.excerpt && <p className="text-muted-foreground">{destacado.excerpt}</p>}
            </div>
          </div>
        </Link>

        {/* Pequeños a la derecha */}
        <div className="space-y-4">
          {resto.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
              <div className="flex gap-3 items-center rounded-2xl bg-muted/50 p-3">
                <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={p.mainImage ? urlFor(p.mainImage).width(160).height(160).url() : "/placeholder.png"}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold leading-snug">{p.title}</h4>
                  {p.excerpt && <p className="text-muted-foreground line-clamp-1">{p.excerpt}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
