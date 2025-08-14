// app/tienda/page.tsx
import ProductCard from "@/components/product-card"
import recursos from "@/data/recursos"

export const metadata = {
  title: "Tienda – Daniel Reyna",
  description: "Recursos descargables para tu bienestar",
}

export default function TiendaPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold">Tienda</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursos.map((r) => (
          <ProductCard
            key={r.slug}
            title={r.title}
            description={r.description}
            image={r.image}
            price={r.price}
            href={`/tienda/${r.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
