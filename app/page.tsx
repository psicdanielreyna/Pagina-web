// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import RecursosDestacados from "@/components/recursosdestacados";
import LatestBlog from "@/components/LatestBlog";
import SectionHeader from "@/components/ui/SectionHeader";
import Separator from "@/components/ui/Separator";
import Opiniones from "@/components/Opiniones";

export default function HomePage() {
  return (
    <main className="bg-[#F4EDE2]">
     {/* HERO principal */}
<section className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-12 items-center gap-8">
  {/* Columna izquierda: texto */}
  <div className="md:col-span-6">
    <h1 className="text-[40px] md:text-[52px] leading-tight tracking-tight text-emerald-900 font-semibold">
      Psicólogo en línea especializado en <br className="hidden md:block" /> 
      <span className="italic text-emerald-800/90">ansiedad y estrés</span>
    </h1>
    <p className="mt-4 text-gray-700 text-base md:text-lg max-w-lg">
      Terapia clara, práctica y efectiva para mejorar tu bienestar emocional.
      Sesiones 1:1, artículos breves y recursos descargables.
    </p>

    <div className="mt-6 flex flex-wrap gap-3">
      <Link 
        href="/servicios" 
        className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
      >
        Agendar sesión
      </Link>
      <Link 
        href="/tienda" 
        className="border border-emerald-700 text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
      >
        Ver recursos
      </Link>
    </div>

    <p className="mt-4 text-sm text-gray-600">
      Cada semana envío una idea práctica por correo.{" "}
      <Link href="/newsletter" className="text-emerald-700 hover:underline font-medium">
        Súmate al newsletter.
      </Link>
    </p>
  </div>

  {/* Columna derecha: imagen */}
  <div className="md:col-span-6 flex justify-center md:justify-end">
    <Image
      src="/images/hero/herodos.jpg.jpg"
      alt="Daniel Reyna – Psicólogo"
      width={520}
      height={380}
      className="rounded-xl shadow-md object-cover"
      priority
    />
  </div>
</section>

      {/* SEPARADOR */}
      <Separator className="my-8 md:my-10" />

      {/* RECURSOS DESTACADOS */}
      <section className="py-12 md:py-16">
        <SectionHeader
          title="Recursos destacados"
          subtitle="Herramientas prácticas y descargables para tu día a día"
        />
        <div className="mt-10">
          <RecursosDestacados />
        </div>
      </section>

      {/* SEPARADOR */}
      <Separator className="my-8 md:my-10" />

      {/* Opiniones (mix terapia + ebooks) */}
        <Opiniones
          title="Opiniones"
          subtitle="Resultados reales con enfoque claro y práctico"
          variant="all"
          limit={6}
        />


      {/* SEPARADOR */}
      <Separator className="my-8 md:my-10" />

      {/* BLOG */}
      <section className="pb-16">
        <SectionHeader title="Artículos" subtitle="Ideas claras y aplicables, sin rodeos" />
        <div className="mx-auto mt-10 max-w-6xl px-4">
          <LatestBlog />
        </div>
      </section>
    </main>
  );
}