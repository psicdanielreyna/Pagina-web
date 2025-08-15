// app/mdx-components.tsx
import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

function PostHero({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="mb-8">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 960px, (min-width: 640px) 90vw, 100vw"
          priority
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-sm text-neutral-600">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "tip" | "warn";
  children: React.ReactNode;
}) {
  const styles =
    type === "tip"
      ? "bg-green-50 border-green-200"
      : type === "warn"
      ? "bg-yellow-50 border-yellow-200"
      : "bg-blue-50 border-blue-200";
  return (
    <div className={`not-prose my-6 rounded-xl border px-4 py-3 ${styles}`}>
      {children}
    </div>
  );
}

/**
 * Mapea etiquetas MDX a componentes de React (Next.js)
 * Para que Next optimice imágenes y use <Link/> en lugar de <a/>
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // sustituimos <img> por Next <Image> con estilos seguros
    img: (props: any) => (
      <span className="not-prose block my-6">
        <Image
          {...props}
          alt={props.alt ?? ""}
          width={props.width ?? 1600}
          height={props.height ?? 900}
          className="rounded-xl border"
        />
      </span>
    ),
    // sustituimos <a> por <Link />
    a: ({ href = "", children, ...rest }: any) => {
      // enlaces absolutos -> <a target="_blank">
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noreferrer" {...rest}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    },

    // componentes “extra” disponibles dentro del MDX:
    PostHero,
    Callout,

    // permite sobrescribir/añadir más desde el propio mdx si quisieras
    ...components,
  };
}
