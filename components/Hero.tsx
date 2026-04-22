"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-black/8" style={{ background: "#F8F5F0" }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 min-h-[420px]">
        {/* Texto */}
        <div className="flex flex-col justify-center px-6 py-14 md:pr-12 md:border-r border-black/8">
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium px-4 py-1.5 mb-6 w-fit">
            Psicólogo · Monterrey
          </span>
          <h1 className="text-4xl md:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-zinc-900">
            Ansiedad y estrés,<br />con claridad.
          </h1>
          <p className="mt-4 text-base text-zinc-500 leading-relaxed max-w-md">
            Terapia práctica y directa. Sin rodeos, con resultados reales para tu día a día.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/servicios"
              className="rounded-full bg-zinc-900 text-white text-sm px-5 py-2.5 hover:bg-zinc-700 transition-colors"
            >
              Agendar sesión
            </Link>
            <Link
              href="/tienda"
              className="text-sm text-zinc-500 px-2 py-2.5 hover:text-zinc-900 transition-colors"
            >
              Ver recursos →
            </Link>
          </div>
        </div>

        {/* Imagen más chica — centrada con padding */}
        <div className="flex items-center justify-center py-10 px-8" style={{ background: "#EEE9E0" }}>
          <Image
            src="/images/hero/herodos.jpg.jpg"
            alt="Daniel Reyna – Psicólogo"
            width={320}
            height={380}
            className="rounded-2xl object-cover w-full max-w-[300px] h-auto"
            priority
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-auto max-w-6xl grid grid-cols-3 border-t border-black/8">
        {[
          { n: "+500", l: "Pacientes atendidos" },
          { n: "50K+", l: "Suscriptores newsletter" },
          { n: "8 años", l: "Experiencia clínica" },
        ].map((s, i) => (
          <div
            key={i}
            className={`py-5 text-center ${i < 2 ? "border-r border-black/8" : ""}`}
          >
            <span className="block text-xl font-medium text-zinc-900">{s.n}</span>
            <span className="text-xs text-zinc-400">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}