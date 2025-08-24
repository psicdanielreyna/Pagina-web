// components/Portable.tsx
"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value).width(1600).height(900).fit("crop").url();
      return (
        <div className="my-6 overflow-hidden rounded-xl">
          <Image
            src={url}
            alt={value?.alt || "Imagen"}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="mt-8 text-3xl font-extrabold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold">{children}</h3>,
    normal: ({ children }) => <p className="mt-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 pl-4 italic text-slate-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 ml-6 list-disc space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 ml-6 list-decimal space-y-2">{children}</ol>,
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="underline underline-offset-2 hover:opacity-80"
      >
        {children}
      </a>
    ),
  },
};

export default function Portable({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
