import Link from 'next/link'

const posts = [
  { slug: 'procrastinacion', title: 'La verdad sobre dejar de procrastinar', excerpt: 'Por qué procrastinamos y cómo dejar de hacerlo sin mitos.' },
  { slug: 'autoayuda-funciona', title: '¿Los libros de autoayuda realmente funcionan?', excerpt: 'Cuándo ayudan, cuándo no, y cómo elegirlos.' },
  { slug: 'burnout-mini-test', title: 'Mini-test: ¿tienes burnout académico?', excerpt: 'Un screening breve para orientarte.' },
  { slug: 'mi-primer-post', title: 'Post MDX de ejemplo', excerpt: 'Este post está escrito en MDX.' },
]

export default function BlogPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <ul className="grid md:grid-cols-2 gap-6">
        {posts.map(p => (
          <li key={p.slug} className="border rounded-xl p-6 bg-card">
            <h3 className="text-xl font-medium mb-2">
              <Link className="hover:underline" href={`/blog/${p.slug}`}>{p.title}</Link>
            </h3>
            <p className="text-muted-foreground">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
