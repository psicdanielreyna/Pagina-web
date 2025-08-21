export default function Hero() {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Terapia clara y práctica para sentirte mejor.
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Herramientas simples que puedes aplicar en tu día a día.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 h-56 md:h-72" />
      </div>
    </section>
  );
}
