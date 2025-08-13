// app/tienda/page.tsx
import ProductCard from '@/components/product-card'
import { recursos } from '@/data/recursos'

export const metadata = {
  title: 'Tienda — Recursos',
  description: 'Manuales y herramientas descargables'
}

export default function TiendaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Tienda</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursos.map((r) => (
          <ProductCard
            key={r.slug}
            title={r.title}
            description={r.description}
            href={`/tienda/${r.slug}`}
            image={r.image}
            price={r.price}
            currency="MXN"
          />
        ))}
      </div>
    </div>
  )
}
