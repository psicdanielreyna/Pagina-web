// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://danielreyna.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostsMeta();

  const items = posts
    .slice()
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta;
    })
    .map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
    }));

  return [
    { url: `${SITE}/`, lastModified: new Date() },
    { url: `${SITE}/blog`, lastModified: new Date() },
    ...items,
  ];
}
