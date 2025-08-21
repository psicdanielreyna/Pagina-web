// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";

// ===== Tipos =====
type Recurso = {
  slug: string;
  title: string;
  excerpt: string;
  img: string;
  alt: string;
};

type Post = {
  title: string;
  excerpt: string;
  href: string;
  img: string;
  alt: string;
};

// ===== Data temporal (puedes reemplazar con fetch desde tu CMS o BD) =====
const recursos: Recurso[] = [
  {
    slug: "como-apagar-tu-mente",
    title: "Cómo Apagar tu Mente",
    excerpt: "Técnicas para detener el sobrepensamiento y recuperar la calma.",
    img: "/manuales/como-apagar-tu-mente.jpg",
    alt: "Portada del manual Cómo Apagar tu Mente",
  },
  {
    slug: "vive-en-calma",
    title: "Vive en Calma",
    excerpt: "Estrategias psicológicas para reducir el estrés día a día.",
    img: "/manuales/vive-en-calma.jpg",
    alt: "Portada del manual Vive en Calma",
  },
  {
    slug: "autoestima",
    title: "Manual de Autoestima",
    excerpt: "Fortalece tu amor propio y confianza con ejercicios prácticos.",
    img: "/manuales/autoestima.jpg",
    alt: "Portada del Manual de Autoestima",
  },
];

const posts: Post[] = [
  {
    title: "¿Por qué me comparo tanto con los demás?",
    excerpt:
      "Exploramos las raíces de la comparación constante y cómo liberarte de ella.",
    href: "/blog/por-que-me-comparo-tanto",
    img: "/blog/comparacion.jpg",
    alt: "Persona mirando su reflejo en el espejo",
  },
  {
    title: "¿Por qué no sé qué siento?",
    excerpt:
      "Un recorrido por la desconexión emocional y cómo volver a conectar contigo mismo.",
    href: "/blog/por-que-no-se-que-siento",
    img: "/blog/emociones.jpg",
    alt: "Persona sosteniendo un corazón dibujado en papel",
  },
];

export default function HomePage() {
  return (
    <main className="space-y-20">
      {/* Hero */}
      <section className="text-center py-16 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl font-bold mb-4">Recursos para tu bienestar</h1>
        <p className="text-lg text-gray-600">
          Encuentra herramientas psicológicas diseñadas para ayudarte a crecer,
          sanar y vivir en calma.
        </p>
      </section>

      {/* Recursos / Manuales */}
      <section className="px-6 md:px-12">
        <h2 className="text-2xl font-bold mb-6">Manuales destacados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {recursos.map((recurso) => (
            <Link
              key={recurso.slug}
              href={`/tienda/${recurso.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-xl shadow hover:shadow-lg transition">
                <Image
                  src={recurso.img}
                  alt={recurso.alt}
                  width={400}
                  height={550}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="mt-3 font-semibold">{recurso.title}</h3>
              <p className="text-sm text-gray-600">{recurso.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="px-6 md:px-12">
        <h2 className="text-2xl font-bold mb-6">Últimos artículos</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={post.img}
                alt={post.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-12">
        <Newsletter />
      </section>
    </main>
  );
}
