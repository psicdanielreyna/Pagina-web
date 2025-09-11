import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ meta }: { meta: PostMeta }) {
  return (
    <article className="rounded-lg border bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800 overflow-hidden">
      {meta.cover && (
        <div className="relative w-full aspect-[16/9] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <Image
            src={meta.cover}
            alt={meta.title ?? "Imagen del post"}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-contain" // 👈 muestra la foto completa
            priority={false}
          />
        </div>
      )}

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold">
          <Link href={`/blog/${meta.slug}`} className="hover:underline">
            {meta.title}
          </Link>
        </h2>

        {meta.excerpt && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {meta.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-zinc-500">
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
                  className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5"
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