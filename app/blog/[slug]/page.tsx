import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { getAllPostSlugs, getPostMeta } from '@/lib/posts'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export const revalidate = 60

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const meta = getPostMeta(params.slug)
  return { title: meta.title, description: meta.excerpt }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const fullPath = path.join(POSTS_DIR, `${params.slug}.mdx`)
  const source = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(source)

  return (
    <article className="max-w-3xl mx-auto py-10 prose prose-neutral">
      {/* El título/fecha vienen del frontmatter si quieres mostrarlos arriba */}
      <MDXRemote source={content} />
    </article>
  )
}
