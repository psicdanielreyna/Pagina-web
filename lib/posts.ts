import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type PostMeta = {
  slug: string
  title: string
  date: string // ISO
  excerpt?: string
  cover?: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getAllPostSlugs() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getPostMeta(slug: string): PostMeta {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(file)
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '1970-01-01',
    excerpt: data.excerpt ?? '',
    cover: data.cover ?? '',
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  const posts = slugs.map(getPostMeta)
  return posts
    .filter((p) => new Date(p.date).getTime() <= Date.now()) // solo publicados
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}
