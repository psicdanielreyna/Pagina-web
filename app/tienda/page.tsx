// app/tienda/page.tsx
import { Metadata } from "next"
import ProductCard from '@/components/product-card' // ← default, sin llaves
import { recursos } from "@/data/recursos"

export const metadata: Metadata = {
  title: "Tienda — Recursos PsicoToolKit",
  description:
    "Catálogo de manuales y herramientas de PsicoToolKit por Daniel Reyna.",
}

export default function TiendaPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-semibold">Tienda</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursos.map((r) => (
          <ProductCard
           <ProductCard
            key={r.slug}
            title={r.title}
            description={r.description}
            image={r.image}
            price={r.price}
            href={`/tienda/${r.slug}`}   // ✅ usa href
          />

        ))}
      </div>
    </div>
  )
}
