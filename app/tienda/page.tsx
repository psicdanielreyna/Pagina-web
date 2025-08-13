import ProductCard from '@/components/product-card'
import { recursos } from "@/data/recursos"
// ...

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

  )
}
