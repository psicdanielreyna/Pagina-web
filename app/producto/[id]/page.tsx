// app/producto/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { productos } from '@/data/productos'
import StripeBuy from '@/components/stripe-buy'
import MPButton from '@/components/mp-button'

type Props = { params: { id: string }, searchParams: { token?: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = productos[params.id]
  if (!p) return { title: 'Producto no encontrado' }
  return {
    title: `${p.title} | PsicoToolKit`,
    description: p.description,
    openGraph: { title: p.title, description: p.description, images: [{ url: p.image }] },
  }
}

const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

export default function ProductoPage({ params, searchParams }: Props) {
  const p = productos[params.id]
  const token = searchParams?.token

  if (!p) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold">Producto no encontrado</h1>
        <p className="text-muted-foreground">Revisa la URL o vuelve a la <Link className="underline" href="/tienda">tienda</Link>.</p>
      </div>
    )
  }

  return (
    <div className="container py-16 grid lg:grid-cols-2 gap-10">
      <div className="relative aspect-[4/3] border rounded-2xl overflow-hidden bg-muted">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold mb-2">{p.title}</h1>
        <p className="text-muted-foreground mb-6">{p.description}</p>
        <div className="text-3xl font-semibold mb-6">{mxn(p.price)}</div>

        {/* Botones de compra */}
        <div className="flex flex-wrap gap-3">
          {p.stripeBuyButtonId && p.stripePublishableKey ? (
            <StripeBuy buyButtonId={p.stripeBuyButtonId} publishableKey={p.stripePublishableKey} />
          ) : null}
          {p.mpEnabled ? <MPButton id={p.id} /> : null}
        </div>

        {/* Separador */}
        <div className="my-8 h-px bg-border" />

        {/* Si el usuario llega con token en la URL, ofrecer descarga explícita (sin redirigir) */}
        {token ? (
          <div className="rounded-xl border p-4 bg-card">
            <p className="text-sm mb-3">Ya tienes acceso. Puedes descargarlo aquí:</p>
            <Link
              href={`/api/download?token=${encodeURIComponent(token)}&id=${encodeURIComponent(p.id)}`}
              className="inline-flex items-center rounded-2xl bg-primary text-primary-foreground h-10 px-4 hover:opacity-95"
            >
              Descargar ahora
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border p-4 bg-card">
            <p className="text-sm text-muted-foreground">
              ¿Ya compraste y tienes un PIN? Descárgalo desde{' '}
              <Link className="underline" href={`/descargar?id=${p.id}`}>esta página</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
