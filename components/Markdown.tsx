"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = { content: string };

export default function Markdown({ content }: Props) {
  return (
    <div className="prose prose-neutral max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-10 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold mt-8 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-relaxed mt-4" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc ms-6 mt-4 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal ms-6 mt-4 space-y-2" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="underline text-evergreen hover:text-evergreen/80"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="rounded-xl my-6 shadow max-w-full h-auto"
              loading="lazy"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-evergreen/30 ps-4 italic my-6"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-gray-200" {...props} />
          ),
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className="px-1 py-0.5 rounded bg-gray-100" {...props} />
            ) : (
              <code
                className="block w-full overflow-x-auto p-4 rounded bg-gray-900 text-gray-100 text-sm my-6"
                {...props}
              />
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
