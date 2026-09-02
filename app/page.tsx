import RecursosDestacados from "@/components/recursosdestacados";
import LatestBlog from "@/components/LatestBlog";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <main style={{ background: "var(--bg-primary)" }}>
      <Hero />

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