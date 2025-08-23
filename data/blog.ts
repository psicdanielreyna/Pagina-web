// data/blog.ts
export type PostHome = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  alt: string;
  date: string;
  href: string;
};

// 👇 datos estáticos (puedes cambiar imágenes/rutas a las tuyas)
export const postsHome: PostHome[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo apagar tu mente",
    excerpt:
      "Técnicas concretas para bajar el ruido mental cuando sientes que la cabeza no para.",
    img: "/images/post-1.png",
    alt: "Cómo apagar tu mente",
    date: "2025-08-10",
    href: "/blog/como-apagar-tu-mente",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El arte de creer en ti",
    excerpt:
      "Pequeños cambios que fortalecen tu autoconfianza sin frases mágicas ni humo.",
    img: "/images/post-2.png",
    alt: "El arte de creer en ti",
    date: "2025-08-05",
    href: "/blog/el-arte-de-creer-en-ti",
  },
  {
    slug: "ansiedad-en-3-pasos",
    title: "Ansiedad en 3 pasos prácticos",
    excerpt:
      "Un mini-protocolo para reconocer, regular y responder mejor ante la ansiedad.",
    img: "/images/post-3.png",
    alt: "Ansiedad en 3 pasos",
    date: "2025-07-28",
    href: "/blog/ansiedad-en-3-pasos",
  },
];

// (opcional) función async para cuando migremos a Sanity:
export async function fetchPostsHome(): Promise<PostHome[]> {
  return postsHome;
}
