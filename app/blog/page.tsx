// app/blog/page.tsx
import { PostCard } from "@/components/PostCard";

const posts = [
  {
    slug: "amor-propio-vs-egoismo-donde-esta-la-linea",
    title: "Amor propio vs. egoísmo: ¿Dónde está la línea?",
    excerpt:
      "Hoy en día se habla mucho de amor propio: poner límites, priorizarte, cuidarte. Pero también es común escuchar frases como “eso ya es egoísmo” o “piensas demasiado en ti”. Entonces, surge la gran pregunta: ¿dónde termina el amor propio y dónde empieza el egoísmo?",
    date: "09 sep 2025",
    cover: "/images/amor-propio.jpg", // Ajusta la ruta de tus imágenes en public/
  },
  {
    slug: "crisis-de-los-veintes",
    title: "La crisis de los veintes: ¿Por qué se siente que vamos tarde en la vida?",
    excerpt:
      "En esta entrada te explico qué es, por qué sucede y cómo manejar este momento en el que sentimos que estamos retrasados en la vida.",
    date: "07 sep 2025",
    cover: "/images/crisis-veintes.jpg",
  },
];

export default function BlogPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-evergreen mb-6">
        Blog
      </h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
