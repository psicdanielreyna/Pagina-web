"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// 👉 Para desactivar la promo después de julio, cambia esto a false
const PROMO_ACTIVE = true;

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
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="inline-block rounded-full text-sm font-medium px-4 py-1.5 w-fit"
              style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
            >
              Psicólogo · Monterrey
            </span>
            {PROMO_ACTIVE && (
              <span
                className="inline-block rounded-full text-sm font-medium px-4 py-1.5 w-fit"
                style={{ background: "#3D2020", color: "#E8C88A" }}
              >
                Julio Regalado
              </span>
            )}
          </div>
          <h1
            className="text-4xl md:text-[2.75rem] font-medium leading-[1.15] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            La ansiedad no desaparece sola.
          </h1>
          <p
            className="mt-4 text-base leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Pero con las herramientas correctas, deja de controlarte.
          </p>
          {PROMO_ACTIVE && (
            <p className="mt-2 text-sm font-medium" style={{ color: "#8B1A1A" }}>
              Sesiones online a $250 MXN — todo julio
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/servicios"
              className="rounded-full text-sm px-5 py-2.5 transition-colors"
              style={
                PROMO_ACTIVE
                  ? { background: "#8B1A1A", color: "#E8C88A" }
                  : { background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }
              }
            >
              {PROMO_ACTIVE ? "Agendar con descuento" : "Agendar sesión"}
            </Link>
            <Link
              href="/tienda"
              className="text-sm px-2 py-2.5 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              Ver tienda →
            </Link>
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