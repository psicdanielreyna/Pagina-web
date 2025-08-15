// app/mdx-components.tsx
import Image from "next/image";
import Link from "next/link";

/** Héroe de post con imagen full-width, responsive y caption opcional */
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

/** Caja de aviso (note/tip/warn) */
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
 * Mapear etiquetas MDX a componentes Next.js sin depender de `mdx/types`.
 * Next detecta automáticamente `useMDXComponents` en App Router.
 */
export function useMDXComponents(components: any): any {
  return {
    // <img> -> Next <Image> con estilos seguros
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

    // <a> -> Next <Link> para rutas internas; externas se abren en pestaña nueva
    a: ({ href = "", children, ...rest }: any) => {
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

    // Componentes extra disponibles en los .mdx
    PostHero,
    Callout,

    ...components,
  };
}
