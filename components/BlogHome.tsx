// components/BlogHome.tsx
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, type PostMeta } from "@/lib/posts";

export default async function BlogHome() {
  // Lee los posts MDX del directorio /content/posts
  const posts: PostMeta[] = await getAllPosts();

  // Muestra solo los 3 más recientes
  const latest = posts
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  if (latest.length === 0) {
    return <p className="text-muted-foreground">Próximamente…</p>;
  }

  return (
    <div className="space-y-4">
      {latest.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="block rounded-xl bg-muted/50 p-4 hover:bg-muted"
        >
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
              <Image
                src={post.cover ?? "/og-default.jpg"}
                alt={post.title}
                width={64}
                height={64}
                className="h-16 w-16 object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">{post.title}</h3>
              <p className="text-xs text-muted-foreground">
                {post.date}
              </p>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}