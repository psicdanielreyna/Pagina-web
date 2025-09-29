// components/PostView.tsx
"use client";

import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
// Si tu archivo se llama mdx-components.tsx y exporta default:
import MDXComponents from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = { meta: PostMeta; content: string };

export default function PostView({ meta, content }: Props) {
  return (
    <article className="prose prose-zinc dark:prose-invert mx-auto max-w-3xl">
      <header className="mb-6">
        <h1 className="mb-2">{meta.title}</h1>
        {meta.date && (
          <time
            dateTime={meta.date}
            className="text-sm opacity-70"
          >
            {new Date(meta.date).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {meta.tags?.length ? (
          <p className="mt-2 text-sm opacity-80">
            {meta.tags.map((t) => `#${t}`).join(" ")}
          </p>
        ) : null}
      </header>

      {meta.cover && (
        <div className="my-6">
          <Image
            src={meta.cover}
            alt={meta.title || "Imagen del artículo"}
            width={1200}
            height={630}
            priority
            className="rounded-2xl"
          />
        </div>
      )}

      {/* Render del contenido MDX */}
      <MDXRemote source={content} components={MDXComponents as any} />
    </article>
  );
}
