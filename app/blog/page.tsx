import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const revalidate = 60

export default function BlogIndex() {
  const posts = getAllPosts()

  if (!posts.length) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p>Próximamente…</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-4">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:underline">
              {p.title}
            </Link>
            <div className="text-sm text-gray-500">
              {new Date(p.date).toLocaleDateString()}
            </div>
            {p.excerpt && <p className="mt-2 text-gray-700">{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
