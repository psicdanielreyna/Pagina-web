import { client } from "@/lib/sanity.client";
import { postBySlugQuery } from "@/lib/sanity.queries";

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    return <p>Post no encontrado</p>;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        Publicado el {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        {post.content}
      </div>
    </main>
  );
}
