// data/posts.ts
export type Post = {
  slug: string
  title: string
  excerpt: string
  image: string // ruta en /public
  date: string  // ISO yyyy-mm-dd
}

const posts: Post[] = [
  {
    slug: "terapia-individual-que-es",
    title: "¿Qué puedes esperar de la terapia individual?",
    excerpt:
      "Cómo es una primera sesión, enfoques que uso y qué objetivos trabajamos para que te sientas acompañado desde el inicio.",
    image: "/blog/post-1.png",
    date: "2025-08-15",
  },
  {
    slug: "ansiedad-que-hacer-ahora",
    title: "Ansiedad: qué hacer cuando aparece ‘de la nada’",
    excerpt:
      "Tres pasos prácticos para regularte en minutos y cortar el ciclo de preocupación–síntoma–preocupación.",
    image: "/blog/post-2.png",
    date: "2025-08-14",
  },
  {
    slug: "tecnica-para-parar-pensamientos",
    title: "Una técnica breve para frenar pensamientos intrusivos",
    excerpt:
      "STOP: una herramienta sencilla para interrumpir rumiación y recuperar claridad en el día a día.",
    image: "/blog/post-3.png",
    date: "2025-08-13",
  },
]

export default posts
