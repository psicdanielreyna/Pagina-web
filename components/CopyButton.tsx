// components/CopyButton.tsx
"use client";

type Props = { text: string; label?: string; className?: string };

export default function CopyButton({ text, label = "Copiar", className }: Props) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copiado ✔");
    } catch {
      alert("No se pudo copiar");
    }
  }
  return (
    <button
      onClick={copy}
      className={className ?? "px-3 py-1 rounded border text-sm hover:bg-gray-50"}
      type="button"
    >
      {label}
    </button>
  );
}