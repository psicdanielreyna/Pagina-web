// app/blog/page.tsx
import posts from "@/data/posts"
import PostCard from "@/components/post-card"

export const metadata = {
  title: "Blog — Daniel Reyna",
  description:
    "Ideas prácticas y herramientas psicológicas para ansiedad, autoestima y bienestar.",
}

export default function BlogPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Blog</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((p) => (
          <PostCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            excerpt={p.excerpt}
            image={p.image}
            date={p.date}
          />
        ))}
      </div>
    </div>
  )
}
