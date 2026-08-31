import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

function formatDate(date?: string, long = false) {
  if (!date) return "Sin fecha";
  return new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: long ? "long" : "short",
    day: "numeric",
  });
}

/* ---------- Variante DESTACADA (hero grande con overlay) ---------- */
export function FeaturedPostCard({ meta }: { meta: PostMeta }) {
  return (
    <Link href={`/blog/${meta.slug}`} className="block group">
      <article
        className="relative rounded-2xl overflow-hidden flex items-end min-h-[280px] md:min-h-[340px]"
        style={{ background: "var(--bg-secondary)" }}
      >
        {meta.cover && (
          <Image
            src={meta.cover}
            alt={meta.title ?? "Imagen del post"}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            priority
          />
        )}
        {/* Overlay para legibilidad */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)" }}
        />
        <div className="relative p-6 md:p-8 w-full">
          <span
            className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.92)", color: "#1a1a1a" }}
          >
            Destacado
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-white leading-tight mb-2 group-hover:underline">
            {meta.title}
          </h2>
          {meta.excerpt && (
            <p className="text-sm mb-3 max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
              {meta.excerpt}
            </p>
          )}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
            {formatDate(meta.date, true)}
          </p>
        </div>
      </article>
    </Link>
  );
}

/* ---------- Variante COMPACTA (tarjeta de grid) ---------- */
export function CompactPostCard({ meta }: { meta: PostMeta }) {
  return (
    <Link href={`/blog/${meta.slug}`} className="block group h-full">
      <article
        className="rounded-2xl overflow-hidden flex flex-col h-full transition-shadow hover:shadow-sm"
        style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
      >
        <div
          className="relative w-full aspect-[16/9] overflow-hidden shrink-0"
          style={{ background: "var(--bg-secondary)" }}
        >
          {meta.cover && (
            <Image
              src={meta.cover}
              alt={meta.title ?? "Imagen del post"}
              fill
              sizes="(min-width: 768px) 340px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <p
            className="text-xs font-medium uppercase tracking-wide mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            {formatDate(meta.date)}
          </p>
          <h3
            className="text-sm font-medium leading-snug mb-3 flex-1 group-hover:underline"
            style={{ color: "var(--text-primary)" }}
          >
            {meta.title}
          </h3>
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {meta.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2 py-0.5 text-xs"
                  style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

/* ---------- Export por defecto: la tarjeta original (por compatibilidad) ---------- */
export default function PostCard({ meta }: { meta: PostMeta }) {
  return <CompactPostCard meta={meta} />;
}