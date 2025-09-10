// lib/slug.ts
export function slugify(input: string): string {
  return input
    .normalize("NFD")                 // separa acentos
    .replace(/[\u0300-\u036f]/g, "")  // elimina diacríticos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")      // cualquier no-alfa-num -> guion
    .replace(/^-+|-+$/g, "");         // recorta guiones laterales
}

export function normalizeSlug(s: string) {
  // por si recibimos una URL ya con acentos o espacios
  try { s = decodeURIComponent(s); } catch {}
  return slugify(s);
}
