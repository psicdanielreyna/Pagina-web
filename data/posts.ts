// /data/posts.ts
export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image?: string
  date: string
}

const posts: BlogPost[] = [
  {
    slug: "mi-primer-post",
    title: "Mi primer post",
    excerpt: "Un vistazo a cómo iniciar tu camino en terapia y bienestar.",
    image: "/blog/placeholder.jpg",
    date: "2025-08-10",
  },
  {
    slug: "como-manejar-la-ansiedad",
    title: "Cómo manejar la ansiedad",
    excerpt: "Herramientas simples para días complicados.",
    image: "/blog/placeholder.jpg",
    date: "2025-08-08",
  },
  {
    slug: "creencias-que-te-frenan",
    title: "Creencias que te frenan",
    excerpt: "Pequeños ajustes de pensamiento con gran impacto.",
    image: "/blog/placeholder.jpg",
    date: "2025-08-05",
  },
]

export default posts
