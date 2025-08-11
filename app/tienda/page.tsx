import ProductCard from '@/components/product-card'
import { recursos } from '@/data/recursos'

export default function TiendaPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold mb-6">Tienda</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursos.map((i) => (
          <ProductCard
            key={i.id}
            title={i.title}
            description={i.description}
            href={i.href}
            image={i.image}
            price={i.price}
            currency={i.currency}
          />
        ))}
      </div>
    </div>
  )
}
