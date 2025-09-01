// data/blog.ts
export type BlogCard = {
  slug: string;          // para /blog/[slug]
  title: string;
  date: string;          // ISO (YYYY-MM-DD) para ordenar bien
  excerpt: string;
  cover: string;         // ruta a la portada
  alt?: string;
};

const posts: BlogCard[] = [
  {
    slug: "apagar-mente",
    title: "Cómo apagar tu mente",
    date: "2025-08-10",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    cover: "/images/blog/apagar-mente.png",
    alt: "Portada: Apagar la mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    date: "2025-08-05",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    cover: "/images/blog/el-arte-de-creer-en-ti.png",
    alt: "Portada: El arte de creer en ti",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Ansiedad en 3 pasos",
    date: "2025-07-28",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    cover: "/images/blog/ansiedad-3-pasos.png",
    alt: "Portada: Ansiedad en 3 pasos",
  },
];

export default posts;