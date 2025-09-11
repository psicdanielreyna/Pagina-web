// Normaliza acentos, espacios y mayúsculas
export function slugify(input: string) {
  return input
    .normalize('NFD')                // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')    // quita símbolos raros
    .trim()
    .replace(/\s+/g, '-')            // espacios → guiones
    .replace(/-+/g, '-');            // colapsa guiones
}