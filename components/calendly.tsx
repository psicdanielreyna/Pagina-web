'use client'
import { useEffect } from 'react'

function ensureCalendlyScript() {
  const id = 'calendly-widget-script'
  if (!document.getElementById(id)) {
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://assets.calendly.com/assets/external/widget.js'
    s.async = true
    document.body.appendChild(s)
  }
}

// INLINE embed (sección completa)
export function CalendlyInline({ url, height = 800 }: { url: string; height?: number }) {
  useEffect(() => { ensureCalendlyScript() }, [])
  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={url}
      style={{ minWidth: '320px', height }}
    />
  )
}

// BOTÓN popup (para usar en cualquier página)
export function CalendlyButton({ url, label = 'Agendar sesión' }: { url: string; label?: string }) {
  useEffect(() => { ensureCalendlyScript() }, [])
  return (
    <button
      onClick={() => (window as any).Calendly?.initPopupWidget({ url })}
      className="inline-flex items-center justify-center rounded-2xl bg-primary text-primary-foreground h-10 px-4 hover:opacity-95"
    >
      {label}
    </button>
  )
}

