// components/PostView.tsx
"use client";

import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import MDXComponents from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = { meta: PostMeta; content: string };

export default function PostView({ meta, content }: Props) {
  return (
    <article
      className="mx-auto max-w-3xl px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-medium leading-tight tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {meta.title}
        </h1>
        {meta.date && (
          <time
            dateTime={meta.date}
            className="text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {meta.tags?.length ? (
          <div className="flex gap-2 mt-3 flex-wrap">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "var(--accent-light)", color: "var(--accent-text)" }}
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Cover */}
      {meta.cover && (
        <div className="mb-8">
          <Image
            src={meta.cover}
            alt={meta.title || "Imagen del artículo"}
            width={1200}
            height={630}
            priority
            className="rounded-2xl w-full h-auto"
          />
        </div>
      )}

      {/* Contenido MDX */}
      <div
        className="prose prose-zinc dark:prose-invert max-w-none
          prose-headings:font-medium prose-headings:tracking-tight
          prose-p:leading-relaxed prose-p:text-base
          prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-2xl prose-img:mx-auto
          prose-blockquote:border-l-emerald-500 prose-blockquote:not-italic
          prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
        style={{ color: "var(--text-primary)" }}
      >
        <MDXRemote source={content} components={MDXComponents as any} />
      </div>
    </article>
  );
}