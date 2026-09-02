"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const DOLORES = [
  "Sentir que la ansiedad decide por ti",
  "Repetir los mismos patrones",
  "Cargar con todo en silencio",
  "Sentir que nada avanza",
  "Vivir en pausa",
];

function HookRotante() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % DOLORES.length);
        setVisible(true);
      }, 250);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        color: "#0F6E56",
        borderBottom: "2px solid #9FE1CB",
        transition: "opacity 0.25s ease",
        opacity: visible ? 1 : 0,
      }}
    >
      {DOLORES[index]}
    </span>
  );
}

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
    <div ref={ref} className="block text-5xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
      {prefix}{count}{suffix}
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{ background: "var(--bg-primary)", borderBottom: "0.5px solid var(--border)" }}>
      <div className="mx-auto max-w-6xl grid md:grid-cols-2" style={{ minHeight: "calc(100vh - 64px)" }}>

        {/* Texto */}
        <div
          className="flex flex-col justify-center px-6 py-14 md:pr-12"
          style={{ borderRight: "0.5px solid var(--border)" }}
        >
          <span
            className="inline-block rounded-full text-sm font-medium px-4 py-1.5 mb-6 w-fit"
            style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
          >
            Psicólogo · Monterrey
          </span>
          <h1
            className="text-3xl md:text-[2.5rem] font-medium leading-[1.18] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            <HookRotante /> no tiene por qué ser para siempre.
          </h1>
          <p
            className="mt-4 text-base leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Hay una salida, y no tienes que encontrarla solo. Terapia con método, a tu ritmo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 items-center">
            <Link
              href="/servicios"
              className="rounded-full text-sm px-6 py-3 transition-colors font-medium"
              style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
            >
              Agenda tu primera sesión
            </Link>
            <Link
              href="/sobre-mi"
              className="text-sm px-2 py-2.5 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              Ver cómo trabajo →
            </Link>
          </div>
          {/* Señales de confianza */}
          <div className="mt-6 flex flex-wrap gap-5 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
              +500 pacientes atendidos
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="15" height="10" rx="2" ry="2" /><polygon points="17 9 22 7 22 17 17 15" /></svg>
              Online o presencial
            </span>
          </div>
        </div>

        {/* Imagen */}
        <div
          className="flex items-center justify-center p-12"
          style={{ background: "var(--bg-secondary)" }}
        >
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

      {/* Stats bar */}
      <div className="w-full grid grid-cols-3" style={{ borderTop: "0.5px solid var(--border)" }}>
        {[
          { target: 500, prefix: "+", suffix: "", label: "Pacientes atendidos" },
          { target: 10, prefix: "", suffix: "K+", label: "Suscriptores newsletter" },
          { target: 5, prefix: "+", suffix: " años", label: "Experiencia en atención" },
        ].map((s, i) => (
          <div
            key={i}
            className="py-12 text-center"
            style={{ borderRight: i < 2 ? "0.5px solid var(--border)" : "none" }}
          >
            <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
            <span className="text-sm mt-2 block" style={{ color: "var(--text-tertiary)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}