// app/page.tsx
import Link from 'next/link'
import ProductCard from '@/components/product-card'
import { recursos } from '@/data/recursos'

export default function HomePage() {
  const destacados = recursos.slice(0, 2)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a PsicoToolKit</h1>
      <p className="text-lg text-gray-700 mb-8">
        Recursos prácticos y herramientas para tu bienestar.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {destacados.map((r) => (
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

      <div className="mt-8">
        <Link
          href="/tienda"
          className="inline-block rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-black"
        >
          Ver todos los recursos
        </Link>
      </div>
    </div>
  )
}
