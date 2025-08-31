import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

function formatDate(d: string) {
  const ms = Date.parse(d || "");
  if (isNaN(ms)) return ""; // evita 1970
  return new Date(ms).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="container max-w-4xl py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-2">
        Lecturas breves y aplicables para sentirte mejor.
      </p>

      <div className="mt-8 space-y-5">
        {posts.length === 0 && (
          <p className="text-muted-foreground">Próximamente…</p>
        )}

        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-xl bg-muted/40 hover:bg-muted p-4 transition"
          >
            <div className="flex items-center gap-4">
              {p.cover && (
                <Image
                  src={p.cover}
                  alt=""
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              )}
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(p.date)}
                </p>
                {p.excerpt && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {p.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
