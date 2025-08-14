"use client"

import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("fail")
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded-lg bg-teal-700 text-white px-4 py-2 hover:bg-teal-800 disabled:opacity-50"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Enviando..." : "Quiero recibirlo"}
      </button>
      {status === "success" && <p className="text-green-600 text-sm">¡Gracias por suscribirte!</p>}
      {status === "error" && <p className="text-red-600 text-sm">Ocurrió un error. Intenta de nuevo.</p>}
    </form>
  )
}
