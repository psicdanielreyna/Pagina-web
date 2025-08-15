// data/posts.ts
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
};

const posts: PostMeta[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo apagar tu mente",
    date: "2025-08-10",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    image: "/blog/post-1.png",  // <-- coincide con tu archivo real
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    date: "2025-08-05",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    image: "/blog/post-2.png",
  },
  {
    slug: "ansiedad-3-pasos",
    title: "Ansiedad en 3 pasos prácticos",
    date: "2025-07-28",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    image: "/blog/post-3.png",
  },
];

export default posts;
