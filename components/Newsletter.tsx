"use client";

export default function Newsletter() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Newsletter</h2>
          <p className="mt-1 text-slate-600">
            Consejos breves y herramientas que sí puedes aplicar.
          </p>

          <form onSubmit={onSubmit} className="mt-4 flex gap-3">
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full rounded-xl border px-4 py-3"
            />
            <button className="rounded-xl bg-green-700 px-5 py-3 text-white">
              Quiero recibirlo
            </button>
          </form>

          <p className="mt-2 text-xs text-slate-500">
            *Cuando tengas tu backend listo, conectamos este formulario a tu
            endpoint real.
          </p>
        </div>
      </div>
    </section>
  );
}
