"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="block text-2xl font-medium text-zinc-900">
      {prefix}{count}{suffix}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="border-b border-black/8" style={{ background: "#F8F5F0" }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2" style={{ minHeight: "calc(100vh - 64px)" }}>

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

        {/* Imagen */}
        <div className="flex items-center justify-center p-12" style={{ background: "#EEE9E0" }}>
          <Image
            src="/images/hero/herodos.jpg.jpg"
            alt="Daniel Reyna – Psicólogo"
            width={340}
            height={420}
            className="rounded-2xl object-cover w-full max-w-[320px] h-auto shadow-sm"
            priority
          />
        </div>
      </div>

      {/* Stats bar — full width */}
      <div className="w-full grid grid-cols-3 border-t border-black/8">
        {[
          { target: 500, prefix: "+", suffix: "", label: "Pacientes atendidos" },
          { target: 10, prefix: "", suffix: "K+", label: "Suscriptores newsletter" },
          { target: 5, prefix: "+", suffix: " años", label: "Experiencia en atención" },
        ].map((s, i) => (
          <div
            key={i}
            className={`py-8 text-center ${i < 2 ? "border-r border-black/8" : ""}`}
          >
            <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
            <span className="text-xs text-zinc-400 mt-1 block">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}