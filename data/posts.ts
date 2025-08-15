// data/posts.ts
export type PostMeta = {
  slug: string;          // debe coincidir con la carpeta/archivo en app/blog/[slug]/page.mdx
  title: string;
  date: string;          // ISO string "2025-08-15"
  excerpt: string;
  image?: string;        // ruta pública de la portada (opcional)
};

const posts: PostMeta[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo apagar tu mente",
    date: "2025-08-10",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    image: "/blog/como-apagar-tu-mente.jpg",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    date: "2025-08-05",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    image: "/blog/el-arte-de-creer-en-ti.jpg",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Ansiedad en 3 pasos prácticos",
    date: "2025-07-28",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    image: "/blog/ansiedad-3-pasos.jpg",
  },
];

export default posts;
