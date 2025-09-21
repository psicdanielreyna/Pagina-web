// components/NewsletterForm.tsx
export default function NewsletterForm() {
  return (
    <section className="mt-16 border-t pt-10">
      <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
        Newsletter semanal
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
        No te pierdas lo mejor para cuidar tu mente cada semana
      </h2>
      <p className="mt-2 text-zinc-600">
        Consejos breves y prácticos. Sin spam. Puedes darte de baja cuando quieras.
      </p>
      <form className="mt-6 flex gap-2">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          className="w-full rounded-md border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Suscribirme
        </button>
      </form>
    </section>
  )
}