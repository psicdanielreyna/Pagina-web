import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const d = post.meta.date && !isNaN(Date.parse(post.meta.date))
    ? new Date(post.meta.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <article className="container max-w-3xl py-10 prose prose-neutral dark:prose-invert">
      <header className="mb-6">
        <h1 className="mb-2">{post.meta.title}</h1>
        {d && <p className="text-sm text-muted-foreground">{d}</p>}
        {post.meta.cover && (
          <div className="mt-4">
            <Image
              src={post.meta.cover}
              alt=""
              width={1200}
              height={630}
              className="rounded-xl object-cover w-full h-auto"
              priority
            />
          </div>
        )}
      </header>

      {post.content}
    </article>
  );
}
