import { getAllPostsMeta } from "@/lib/posts";

export default async function sitemap() {
  const base = "https://tudominio.com";
  const posts = await getAllPostsMeta();
  const blogUrls = posts.map(p => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date ?? new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...blogUrls,
  ];
}