// data/manuals.ts (como ya lo tienes)
export type Manual = { slug: string; title: string; price: number; description?: string };

export const MANUALS: Manual[] = [
  { slug: "como-apagar-la-mente", title: "Cómo Apagar la Mente", price: 199,
    description: "Guía práctica para calmar el ruido mental." },
  { slug: "el-arte-de-creer-en-ti", title: "El Arte de Creer en Ti", price: 199,
    description: "Estrategias simples para potenciar tu autoestima." },
];

// alias públicos aceptados en la URL
export const MANUAL_ALIASES: Record<string, string> = {
  "apagar-mente": "como-apagar-la-mente",
};

export function resolveManualSlug(slug: string) {
  return MANUAL_ALIASES[slug] ?? slug;
}

export function getManualAny(slug: string) {
  const real = resolveManualSlug(slug);
  return MANUALS.find((m) => m.slug === real) ?? null;
}

/** Para SSG de rutas dinámicas (incluye alias) */
export function manualSlugsForBuild() {
  return [...MANUALS.map((m) => m.slug), ...Object.keys(MANUAL_ALIASES)];
}

export { getManualAny as getManual };