"use client";

import { useState } from "react";

type Props = {
  text: string;
  label?: string;
  className?: string;
  small?: boolean; // ← NUEVO
};

export default function CopyButton({
  text,
  label = "Copiar",
  className = "",
  small = false,
}: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // opcional: manejar error
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copiar ${text}`}
      className={`inline-flex items-center rounded-full border border-slate-300 bg-white hover:bg-slate-50
        ${small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${className}`}
    >
      {copied ? "¡Copiado!" : label}
    </button>
  );
}