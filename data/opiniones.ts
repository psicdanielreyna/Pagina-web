// data/opiniones.ts
export type Opinion = {
  initials: string;                       // "A. C."
  date: string;                           // "2025-10-23"
  rating: 1 | 2 | 3 | 4 | 5;
  type: "therapy" | "ebook";
  ebookSlug?: "como-apagar-la-mente" | "el-arte-de-creer-en-ti";
  text: string;
};

export const opiniones: Opinion[] = [
  {
    initials: "A. C.",
    date: "2025-10-10",
    rating: 5,
    type: "therapy",
    text: "Me sentí escuchada y con tareas específicas que me ayudaron mucho.",
  },
  {
    initials: "D. R.",
    date: "2025-10-15",
    rating: 5,
    type: "ebook",
    ebookSlug: "como-apagar-la-mente",
    text: "Muy práctico. El workbook me ayudó a bajar el ruido mental.",
  },
];