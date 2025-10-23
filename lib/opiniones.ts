// lib/opiniones.ts
export type Opinion = {
  id: string;
  type: "therapy" | "ebook";
  productSlug?: string; // ej. "apagar-mente" o "el-arte-de-creer-en-ti" (para ebooks)
  initials: string;     // "D. R."
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;         // ISO: "2025-10-18"
};

export const opiniones: Opinion[] = [
  {
    id: "op-001",
    type: "therapy",
    initials: "M. G.",
    rating: 5,
    comment:
      "Súper claro y práctico. En pocas sesiones noté cambios reales en cómo manejo mi ansiedad.",
    date: "2025-09-28",
  },
  {
    id: "op-002",
    type: "ebook",
    productSlug: "apagar-mente",
    initials: "D. R.",
    rating: 5,
    comment:
      "El workbook de ‘Cómo Apagar tu Mente’ me ayudó a aterrizar mis pensamientos con ejercicios simples.",
    date: "2025-09-20",
  },
  {
    id: "op-003",
    type: "ebook",
    productSlug: "el-arte-de-creer-en-ti",
    initials: "L. P.",
    rating: 4,
    comment:
      "Ideas muy aterrizadas para mejorar la autoestima. Me gustaron los ejercicios semanales.",
    date: "2025-10-01",
  },
  {
    id: "op-004",
    type: "therapy",
    initials: "A. C.",
    rating: 5,
    comment:
      "Me sentí escuchada y con tareas específicas. La TCC me funcionó mejor de lo que esperaba.",
    date: "2025-10-10",
  },
];