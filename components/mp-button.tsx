'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function MPButton({ id, email }: { id: string; email?: string }) {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    const r = await fetch('/api/mp/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, email }),
    })
    const data = await r.json()
    if (data?.init_point) window.location.href = data.init_point
    setLoading(false)
  }
  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? 'Redirigiendo…' : 'Pagar con Mercado Pago'}
    </Button>
  )
}
