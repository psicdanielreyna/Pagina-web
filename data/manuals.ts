// data/manuals.ts (como ya lo tienes)
export type Manual = { slug: string; title: string; price: number; description?: string };

export const MANUALS: Manual[] = [
  { slug: "como-apagar-la-mente", title: "Cómo Apagar la Mente", price: 249,
    description: "Deja de revivir la misma conversación a las 3am. Técnicas concretas de TCC para que tu mente por fin te deje descansar — y tú puedas volver a dormir tranquilo." },
  { slug: "el-arte-de-creer-en-ti", title: "El Arte de Creer en Ti", price: 249,
    description: "Deja de pedir permiso para ser tú. Un método paso a paso para confiar en tus decisiones, poner límites y dejar de depender de la aprobación de los demás." },
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