// data/manuals.ts
export type Manual = {
  slug: string;
  title: string;
  price: number;        // en MXN
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
    slug: "tecnicas-para-detener-el-sobrepensamiento",
    title: "Técnicas para Detener el Sobrepensamiento",
    price: 199,
    description: "Estrategias simples para salir del bucle mental.",
  },
];

export function getManual(slug: string) {
  return MANUALS.find((m) => m.slug === slug) ?? null;
}