export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string; // ✅ opcional, para que TS no marque error
};

const posts: PostMeta[] = [
  {
    slug: "autoayuda-funciona",
    title: "¿Los libros de autoayuda realmente funcionan?",
    date: "2025-08-22",
    excerpt:
      "Analizamos si los libros de autoayuda pueden sustituir la terapia o si son un buen complemento para tu crecimiento personal.",
    image: "/images/autoayuda.jpg", // ✅ ejemplo demo
  },
  {
    slug: "burnout-mini-test",
    title: "Mini test de burnout",
    date: "2025-07-15",
    excerpt:
      "Un test breve de 2 minutos para identificar si estás en riesgo de burnout y cómo tomar acción a tiempo.",
    image: "/images/burnout.jpg",
  },
  {
    slug: "procrastinacion",
    title: "La verdad sobre dejar de procrastinar",
    date: "2025-06-30",
    excerpt:
      "Desmitificamos la eficiencia constante y explicamos por qué procrastinamos y cómo dejar de hacerlo paso a paso.",
    image: "/images/procrastinacion.jpg",
  },
];

export default posts;