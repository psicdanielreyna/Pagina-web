// data/manuals.ts
export type Manual = {
  slug: string;
  title: string;
  price: number;         // MXN
  description?: string;
  cover?: { src: string; alt?: string };
};

export const MANUALS: Manual[] = [
  {
    slug: "apagar-mente",
    title: "Cómo Apagar tu Mente",
    price: 199,
    description: "Guía práctica para calmar el ruido mental.",
    cover: { src: "/images/tienda/apagar-mente.png", alt: "Portada Cómo Apagar tu Mente" },
  },
  {
    slug: "el-arte-de-creer-en-ti",
    title: "El Arte de Creer en Ti",
    price: 199,
    description: "Estrategias para potenciar tu autoestima.",
    cover: { src: "/images/tienda/el-arte-de-creer-en-ti.png", alt: "Portada El Arte de Creer en Ti" },
  },
];

export const getManual = (slug: string) => MANUALS.find(m => m.slug === slug);