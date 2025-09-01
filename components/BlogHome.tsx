// components/BlogHome.tsx
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog"; // o tu import actual

// -- Nuevo helper: convierte string de fecha a timestamp seguro
const toTime = (d?: string) => {
  if (!d) return 0; // sin fecha -> al final
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
};

export default function BlogHome() {
  // Tomamos los 3 más recientes; si no hay fecha, quedan abajo
  const latest = [...posts]
    .sort((a, b) => toTime(b.date) - toTime(a.date))
    .slice(0, 3);

  if (latest.length === 0) {
    return null;
  }

  const [destacado, ...resto] = latest;

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
        {/* Grande a la izquierda */}
        <Link href={destacado.href} className="md:col-span-2 group block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            {destacado.img && (
              <Image
                src={destacado.img}
                alt={destacado.alt ?? destacado.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 768px) 66vw, 100vw"
                priority
              />
            )}
          </div>
          <h3 className="mt-4 text-2xl font-bold">{destacado.title}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {destacado.date
              ? new Date(destacado.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Sin fecha"}
          </p>
          <p className="mt-2 text-slate-600">{destacado.excerpt}</p>
        </Link>

        {/* Dos chicos a la derecha */}
        <div className="space-y-5">
          {resto.map((p) => (
            <Link key={p.slug} href={p.href} className="group flex gap-4">
              <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                {p.img && (
                  <Image
                    src={p.img}
                    alt={p.alt ?? p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="112px"
                  />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="line-clamp-2 font-semibold">{p.title}</h4>
                <p className="mt-1 text-xs text-slate-500">
                  {p.date
                    ? new Date(p.date).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Sin fecha"}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}