interface HeroBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  accentText?: string;
  accentSub?: string;
}

export default function HeroBanner({
  badge,
  title,
  subtitle,
  stats,
  accentText,
  accentSub,
}: HeroBannerProps) {
  return (
    <section
      className="w-full"
      style={{ background: "var(--bg-primary)", borderBottom: "0.5px solid var(--border)" }}
    >
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 min-h-[280px]">

        {/* Columna izquierda — texto */}
        <div
          className="flex flex-col justify-center px-6 py-12 md:pr-12"
          style={{ borderRight: "0.5px solid var(--border)" }}
        >
          <span
            className="inline-block rounded-full text-xs font-medium px-3 py-1 mb-5 w-fit tracking-wide uppercase"
            style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
          >
            {badge}
          </span>
          <h1
            className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle}
            </p>
          )}
          {stats && (
            <div className="grid grid-cols-3 mt-8" style={{ borderTop: "0.5px solid var(--border)" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="pt-4 text-center"
                  style={{ borderRight: i < stats.length - 1 ? "0.5px solid var(--border)" : "none" }}
                >
                  <span className="block text-lg font-medium" style={{ color: "var(--text-primary)" }}>
                    {s.value}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha — acento verde */}
        <div
          className="flex items-center justify-center px-10 py-12"
          style={{ background: "var(--accent)" }}
        >
          <div className="text-center">
            <span
              className="inline-block rounded-full text-xs font-medium px-3 py-1 mb-4 tracking-wide uppercase"
              style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
            >
              {accentText ?? badge}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              {accentSub ?? subtitle}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}