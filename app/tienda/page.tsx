import { ProductCard } from '@/components/product-card'

const items = [
  { id: 'overthinking', title: 'Cómo Apagar tu Mente', price: 'MXN —', href: '/tienda/overthinking', description: 'Workbook práctico para calmar el sobrepensamiento.', image: '/placeholder.svg' },
  { id: 'kit-ansiedad', title: 'Kit Terapeuta: Ansiedad', price: 'MXN —', href: '/tienda/kit-ansiedad', description: 'Hojas de trabajo, scripts y plan de 6 sesiones.', image: '/placeholder.svg' },
]

export default function TiendaPage(){
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold mb-6">Tienda</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(i => <ProductCard key={i.id} {...i} />)}
      </div>
    </div>
  )
}
