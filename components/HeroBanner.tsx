interface HeroBannerProps {
  badge: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
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
      className="w-full border-b border-black/8"
      style={{ background: "#F8F5F0" }}
    >
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 min-h-[280px]">

        {/* Columna izquierda — texto */}
        <div className="flex flex-col justify-center px-6 py-12 md:pr-12 md:border-r border-black/8">
          <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 mb-5 w-fit tracking-wide uppercase">
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-medium text-zinc-900 leading-[1.1] tracking-tight mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
              {subtitle}
            </p>
          )}
          {stats && (
            <div className="grid grid-cols-3 border-t border-black/8 mt-8">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`pt-4 text-center ${i < stats.length - 1 ? "border-r border-black/8" : ""}`}
                >
                  <span className="block text-lg font-medium text-zinc-900">{s.value}</span>
                  <span className="text-xs text-zinc-400">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha — acento verde */}
        <div
          className="flex items-center justify-center px-10 py-12"
          style={{ background: "#1D9E75" }}
        >
          <div className="text-center">
            <span className="inline-block rounded-full text-xs font-medium px-3 py-1 mb-4 tracking-wide uppercase" style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}>
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