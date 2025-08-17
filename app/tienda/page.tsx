// app/tienda/page.tsx
import ProductCard from "@/components/product-card";
import recursos from "@/data/recursos";

export const metadata = {
  title: "Tienda",
  description:
    "Manuales y recursos prácticos para trabajar ansiedad, autoestima y bienestar.",
};

export default function TiendaPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink">
              Tienda
            </h1>
            <p className="text-ink-soft text-lg max-w-3xl">
              Recursos descargables para que avances a tu ritmo.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recursos.map((r) => (
              <ProductCard
                key={r.slug}
                title={r.title}
                description={r.description}
                image={r.image}
                price={r.price}
                href={r.href ?? `/tienda/${r.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
