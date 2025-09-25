// data/manuals.ts
export type Manual = {
  slug: string;
  title: string;
  price: number;      // MXN
  description?: string;
};

export const MANUALS: Manual[] = [
  {
    slug: "como-apagar-la-mente",
    title: "Cómo Apagar la Mente",
    price: 199,
    description: "Guía práctica para calmar el ruido mental.",
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: 199,
    description: "Estrategias para fortalecer tu autoconfianza.",
  },
];

// helper
export const getManual = (slug: string) =>
  MANUALS.find((m) => m.slug === slug);