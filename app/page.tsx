import RecursosDestacados from "@/components/recursosdestacados";
import LatestBlog from "@/components/LatestBlog";
import Hero from "@/components/Hero";
import NewsletterSection from "@/components/NewsletterSection";
import dynamic from "next/dynamic";

const Opiniones = dynamic(() => import("@/components/Opiniones"), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* RECURSOS */}
      <section className="py-12 md:py-16 border-b border-black/8">
        <h2 className="text-center text-xs font-medium uppercase tracking-widest text-zinc-400 mb-8">
          Recursos destacados
        </h2>
        <RecursosDestacados />
      </section>

      {/* OPINIONES */}
      <section className="py-12 md:py-16 border-b border-black/8">
        <Opiniones
          title="Opiniones"
          subtitle="Resultados reales con enfoque claro y práctico"
          variant="all"
          limit={6}
        />
      </section>

      {/* BLOG */}
      <section className="py-12 md:py-16 border-b border-black/8">
        <h2 className="text-center text-xs font-medium uppercase tracking-widest text-zinc-400 mb-8">
          Artículos recientes
        </h2>
        <LatestBlog />
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection />
    </main>
  );
}