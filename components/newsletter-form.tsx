'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function NewsletterForm(){
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <form
      className="flex flex-col md:flex-row gap-3"
      onSubmit={(e)=>{ e.preventDefault(); setSent(true) }}
    >
      <input
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="flex-1 h-11 px-4 rounded-xl border bg-background"
      />
      <Button type="submit">Quiero recibirlo</Button>
      {sent && <p className="text-sm text-green-600 md:ml-2">¡Listo! Revisa tu correo.</p>}
    </form>
  )
}
