import Image from "next/image";
import Link from "next/link";
import posts from "@/data/blog"; // ✅ importamos el default export

// -- Nuevo helper: convierte string de fecha a timestamp seguro
const toTime = (d?: string) => {
  if (!d) return 0;
  return new Date(d).getTime() || 0;
};

export default function BlogHome() {
  // Ordenar posts por fecha y tomar solo los 3 más recientes
  const latest = posts
    .filter((p) => !!p.date) // ✅ evitar undefined
    .sort((a, b) => (toTime(a.date) < toTime(b.date) ? 1 : -1))
    .slice(0, 3);

  if (latest.length === 0) {
    return (
      <section className="py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Últimos artículos</h2>
        <p>No hay artículos disponibles aún.</p>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <h2 className="text-2xl font-bold mb-6">Últimos artículos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg shadow-soft overflow-hidden bg-card hover:shadow-md transition"
          >
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-2">
                {new Date(post.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}