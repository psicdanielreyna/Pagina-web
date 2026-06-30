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
            className="rounded-2xl px-8 py-10 md:px-10 md:py-12 grid md:grid-cols-[64px_1.05fr_1fr] gap-6 md:gap-8 items-center"
            style={{ background: "#085041" }}
          >
            {/* Ícono */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5DCAA5"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01" />
                <path d="M9 12v.01" />
                <path d="M9 15v.01" />
                <path d="M9 18v.01" />
              </svg>
            </div>

            {/* Copy */}
            <div>
              <span
                className="inline-block rounded-full text-xs font-medium px-3 py-1 mb-4 w-fit"
                style={{ background: "rgba(255,255,255,0.12)", color: "#9FE1CB" }}
              >
                Consultoría organizacional · NOM-035
              </span>
              <h2
                className="text-xl md:text-2xl font-medium leading-snug tracking-tight mb-3"
                style={{ color: "#ffffff" }}
              >
                Rotación, clima laboral y burnout —{" "}
                <span style={{ color: "#5DCAA5" }}>resueltos con metodología.</span>
              </h2>
              <p
                className="text-sm leading-relaxed mb-6 max-w-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Diagnóstico real, intervención basada en evidencia y acompañamiento
                continuo. Membresías mensuales para empresas en Monterrey.
              </p>
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  href="/empresas"
                  className="rounded-full text-sm px-5 py-2.5 transition-opacity hover:opacity-90"
                  style={{ background: "#ffffff", color: "#085041" }}
                >
                  Ver planes y metodología
                </Link>
                <Link
                  href="/empresas#metodologia"
                  className="text-sm py-2.5 transition-colors"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Conocer metodología RAÍZ →
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { num: "NOM-035", label: "Cumplimiento incluido" },
                { num: "4 fases", label: "Metodología RAÍZ" },
                { num: "Retainer", label: "Aliado mensual" },
                { num: "PyMEs+", label: "10–300+ col." },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3.5"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span
                    className="text-sm font-medium block mb-1"
                    style={{ color: "#5DCAA5" }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-xs leading-snug"
                    style={{ color: "rgba(255,255,255,0.55)" }}
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