'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function DescargarPage() {
  const sp = useSearchParams()
  const id = sp.get('id') || ''
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setLoading(true); setError(null)
    const url = `/api/download?id=${encodeURIComponent(id)}&pin=${encodeURIComponent(pin)}`
    const res = await fetch(url)
    if (!res.ok) {
      setLoading(false)
      setError(res.status === 401 ? 'PIN incorrecto' : 'No se pudo descargar')
      return
    }
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${id}.pdf`
    a.click()
    URL.revokeObjectURL(a.href)
    setLoading(false)
  }

  if (!id) return <div className="container py-16">Falta el parámetro <code>id</code>.</div>

  return (
    <div className="container py-16 max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Descargar recurso</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Ingresa tu PIN para descargar el archivo.
      </p>
      <div className="flex gap-2">
        <Input
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <Button onClick={handleDownload} disabled={loading || !pin}>
          {loading ? 'Descargando…' : 'Descargar'}
        </Button>
      </div>
      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
    </div>
  )
}
