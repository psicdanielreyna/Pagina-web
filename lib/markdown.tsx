// lib/markdown.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code"; // ESM import

const prettyOptions = {
  theme: "github-dark",
  keepBackground: false,
};

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // el plugin no tiene tipos estrictos, forzamos any para evitar choques con TS
        rehypePlugins={[[rehypePrettyCode as any, prettyOptions]]}
        components={{
          a: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          // mantenemos <img> aquí para simplicidad; más tarde puedes migrarlo a next/image
          img: (props) => (
            <img
              {...props}
              alt={props.alt ?? ""}
              loading="lazy"
              className="my-6 rounded-md"
            />
          ),
          code: (props) => <code {...props} className="px-1 py-0.5 rounded" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}