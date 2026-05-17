import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ meta }: { meta: PostMeta }) {
  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
    >
      {meta.cover && (
        <div
          className="relative w-full aspect-[16/9] overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          <Image
            src={meta.cover}
            alt={meta.title ?? "Imagen del post"}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
      )}

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-medium" style={{ color: "var(--text-primary)" }}>
          <Link href={`/blog/${meta.slug}`} className="hover:underline">
            {meta.title}
          </Link>
        </h2>

        {meta.excerpt && (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {meta.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span>
            {meta.date
              ? new Date(meta.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Sin fecha"}
          </span>

          {meta.tags && meta.tags.length > 0 && (
            <div className="flex gap-2">
              {meta.tags.map((tag) => (
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
      </div>
    </article>
  );
}