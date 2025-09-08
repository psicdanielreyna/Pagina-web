import { getAllSlugs, getPostHtml } from "@/lib/posts";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostHtml(params.slug);

  if (!post) {
    return <p>Post no encontrado</p>;
  }

  return (
    <article className="prose mx-auto px-4 py-8">
      <h1>{post.meta.title}</h1>
      <p className="text-sm text-gray-500">{post.meta.date}</p>
      {post.meta.image && (
        <img
          src={post.meta.image}
          alt={post.meta.title}
          className="my-4 rounded-lg"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}