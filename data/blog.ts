import { client } from "@/lib/sanity.client";
import { allPostsQuery } from "@/lib/sanity.queries";

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <a
            key={post._id}
            href={`/blog/${post.slug}`}
            className="block border p-4 rounded-lg hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
            <p className="text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
