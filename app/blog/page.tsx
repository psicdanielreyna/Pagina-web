// app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndex() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-2">Próximamente…</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-muted-foreground mt-2">
        Lecturas breves y aplicables para sentirte mejor.
      </p>

      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="rounded-lg bg-muted/30 p-4 hover:bg-muted/50">
            <Link href={`/blog/${p.slug}`} className="block">
              <div className="flex items-center gap-4">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt=""
                    width={72}
                    height={72}
                    className="rounded-md object-cover"
                  />
                ) : null}
                <div>
                  <h2 className="font-semibold">{p.title}</h2>
                  {p.date && (
                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(
                        new Date(p.date)
                      )}
                    </p>
                  )}
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {p.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
