import RecursosDestacados from "@/components/recursosdestacados";
import LatestBlog from "@/components/LatestBlog";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg-primary)" }}>
      <Hero />

      {/* EMPRESAS */}
      <section
        className="py-12 md:py-16"
        style={{ borderBottom: "0.5px solid var(--border)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p
            className="text-xs font-medium uppercase tracking-widest mb-8 text-center"
            style={{ color: "var(--text-tertiary)" }}
          >
            También trabajo con empresas
          </p>
          <div
            className="rounded-2xl grid md:grid-cols-2 overflow-hidden"
            style={{ border: "0.5px solid var(--border)" }}
          >
            {/* Copy */}
            <div
              className="flex flex-col justify-center px-8 py-10"
              style={{ borderRight: "0.5px solid var(--border)" }}
            >
              <span
                className="inline-block rounded-full text-xs font-medium px-3 py-1 mb-5 w-fit"
                style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
              >
                Consultoría organizacional · NOM-035
              </span>
              <h2
                className="text-2xl md:text-3xl font-medium leading-snug tracking-tight mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Rotación, clima laboral y burnout —<br />
                <span style={{ color: "var(--accent-text)" }}>resueltos con metodología.</span>
              </h2>
              <p
                className="text-sm leading-relaxed mb-8 max-w-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Diagnóstico real, intervención basada en evidencia y acompañamiento
                continuo. Membresías mensuales para empresas en Monterrey.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  href="/empresas"
                  className="rounded-full text-sm px-5 py-2.5 transition-colors"
                  style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                >
                  Ver planes y metodología
                </Link>
                <Link
                  href="/empresas#metodologia"
                  className="text-sm py-2.5 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Conocer metodología RAÍZ →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2"
              style={{ background: "var(--bg-secondary)" }}
            >
              {[
                { num: "NOM-035", label: "Cumplimiento normativo incluido" },
                { num: "4 fases", label: "Metodología estructurada RAÍZ" },
                { num: "Retainer", label: "Aliado estratégico mensual" },
                { num: "PyMEs+", label: "Desde 10 hasta 300+ colaboradores" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center px-6 py-8"
                  style={{
                    borderRight: i % 2 === 0 ? "0.5px solid var(--border)" : "none",
                    borderBottom: i < 2 ? "0.5px solid var(--border)" : "none",
                  }}
                >
                  <span
                    className="text-xl font-medium tracking-tight mb-1"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-xs leading-snug"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section
        className="py-12 md:py-16"
        style={{ borderBottom: "0.5px solid var(--border)" }}
      >
        <h2
          className="text-center text-xs font-medium uppercase tracking-widest mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          Recursos destacados
        </h2>
        <RecursosDestacados />
      </section>

      {/* BLOG */}
      <section
        className="py-12 md:py-16"
        style={{ borderBottom: "0.5px solid var(--border)" }}
      >
        <h2
          className="text-center text-xs font-medium uppercase tracking-widest mb-8"
          style={{ color: "var(--text-tertiary)" }}
        >
          Artículos recientes
        </h2>
        <LatestBlog />
      </section>
    </main>
  );
}