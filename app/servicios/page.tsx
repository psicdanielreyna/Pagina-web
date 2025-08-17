// app/servicios/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Servicios",
  description:
    "Terapia individual, paquete mensual y terapia de pareja. Elige la modalidad que mejor se ajuste a ti.",
};

export default function ServiciosPage() {
  const servicios = [
    {
      slug: "individual",
      titulo: "Terapia individual",
      desc:
        "Sesión de 50 minutos. Enfoque TCC breve: ansiedad, depresión, duelo y autoestima.",
      precio: "MXN $700",
    },
    {
      slug: "paquete",
      titulo: "Paquete mensual (4 sesiones)",
      desc:
        "Acompañamiento continuo durante el mes. Ideal para trabajar objetivos concretos.",
      precio: "MXN $2,500",
    },
    {
      slug: "pareja",
      titulo: "Terapia de pareja",
      desc:
        "Sesión de 60 minutos. Comunicación, resolución de conflictos y acuerdos realistas.",
      precio: "MXN $1,100",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-10">
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-hero font-extrabold text-ink">
              Servicios
            </h1>
            <p className="text-lg md:text-xl text-ink-soft max-w-3xl mx-auto">
              Enfoque TCC breve para ansiedad, depresión, duelo y autoestima.
              Atención en línea y presencial (Monterrey).
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicios.map((s) => (
              <article key={s.slug} className="card p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-ink">{s.titulo}</h3>
                <p className="text-ink-soft mt-2">{s.desc}</p>
                <div className="mt-4 text-ink font-semibold">{s.precio}</div>
                <div className="mt-auto pt-6 flex gap-3">
                  <Link href={`/agenda?t=${s.slug}`} className="btn-primary">
                    Agendar
                  </Link>
                  <Link href="/agenda" className="btn-ghost">
                    Ver disponibilidad
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link href="/agenda" className="btn-primary">
              Ir a la agenda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
