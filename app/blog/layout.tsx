// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Entradas del blog de psicología y bienestar",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Importante: aquí NO uses <html> ni <body>
  return <section className="container mx-auto px-4 py-10">{children}</section>;
}