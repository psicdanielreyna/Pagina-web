// lib/posts.ts (fragmento clave)
export type PostMeta = {
  slug: string;
  title: string;
  date: string;         // ISO yyyy-mm-dd
  excerpt?: string;
  cover?: string | null;
  draft?: boolean;
};

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  // ...lee tus MD/MDX...
  // Asegúrate de NO ocultar posts por error:
  const posts = all
    .map(m => ({
      slug: m.slug,
      title: m.title,
      date: m.date,
      excerpt: m.excerpt ?? "",
      cover: m.cover ?? null,
      draft: Boolean(m.draft),
    }))
    // si usas draft en algún MD, respeta el filtro:
    .filter(p => !p.draft)
    // orden cronológico descendente
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}
