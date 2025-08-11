import Image from 'next/image'
import StripeBuy from '@/components/stripe-buy'

export default function ProductoPage() {
  return (
    <div className="container py-16 grid lg:grid-cols-2 gap-10">
      <div className="relative aspect-[4/3] border rounded-2xl overflow-hidden">
        <Image src="/manuales/apagar-mente.png" alt="Cómo Apagar tu Mente" fill className="object-cover"/>
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-2">Cómo Apagar tu Mente</h1>
        <p className="text-muted-foreground mb-6">
          Técnicas prácticas para detener el sobrepensamiento y encontrar calma.
        </p>
        <div className="mb-2 text-3xl font-semibold">MXN 249</div>
        {/* 👉 pega tus IDs reales */}
        <StripeBuy buyButtonId="buy_btn_COMO_APAGAR" publishableKey="pk_test_..." />
      </div>
    </div>
  )
}
