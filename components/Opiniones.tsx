// components/Opiniones.tsx
import Stars from "@/components/ui/Stars";
import { opiniones as allOpiniones, Opinion } from "@/lib/opiniones";
import { Fragment, useMemo } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  variant?: "all" | "therapy" | { ebookSlug: string };
  limit?: number; // si quieres recortar la lista
};

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

export default function Opiniones({
  title = "Opiniones",
  subtitle = "Lo que dicen clientes y lectores",
  variant = "all",
  limit = 6,
}: Props) {
  const opiniones = useMemo(() => {
    let arr: Opinion[] = allOpiniones;
    if (variant === "therapy") {
      arr = arr.filter((o) => o.type === "therapy");
    } else if (typeof variant === "object" && "ebookSlug" in variant) {
      arr = arr.filter((o) => o.type === "ebook" && o.productSlug === variant.ebookSlug);
    }
    // más recientes primero
    arr = [...arr].sort((a, b) => (a.date < b.date ? 1 : -1));
    return limit ? arr.slice(0, limit) : arr;
  }, [variant, limit]);

  const avg =
    opiniones.length > 0
      ? opiniones.reduce((s, o) => s + o.rating, 0) / opiniones.length
      : 0;

  // JSON-LD para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product", // o "Service" para terapia, puedes parametrizarlo si quieres
    name:
      typeof variant === "object"
        ? `Ebook: ${variant.ebookSlug}`
        : variant === "therapy"
        ? "Servicio de terapia psicológica"
        : "Recursos y terapia — Daniel Reyna",
    aggregateRating: opiniones.length
      ? {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: opiniones.length,
        }
      : undefined,
    review: opiniones.map((o) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: o.rating, bestRating: 5 },
      reviewBody: o.comment,
      author: { "@type": "Person", name: o.initials },
      datePublished: o.date,
    })),
  };

  return (
    <section className="bg-[#F3EBDD] py-12 md:py-14">
      {/* JSON-LD */}
        <script
        type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm md:text-base text-emerald-900/80">
              {subtitle}
            </p>
          )}
          <div className="mx-auto mt-4 h-px w-24 rounded bg-emerald-900/20" />
        </header>

        {opiniones.length === 0 ? (
          <p className="text-center text-sm text-emerald-900/70">
            Aún no hay opiniones para mostrar.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {opiniones.map((op) => (
              <li
                key={op.id}
                className="rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                      {op.initials}
                    </div>
                    <div className="text-xs text-emerald-900/70">
                      {formatDate(op.date)}
                    </div>
                  </div>
                  <Stars value={op.rating} />
                </div>
                <p className="mt-3 text-sm text-emerald-900/90">{op.comment}</p>
                {op.type === "ebook" && op.productSlug && (
                  <div className="mt-3">
                    <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-900/80">
                      Ebook
                    </span>
                  </div>
                )}
                {op.type === "therapy" && (
                  <div className="mt-3">
                    <span className="inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-900/80">
                      Terapia
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}