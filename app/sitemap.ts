// app/sitemap.ts
import type { MetadataRoute } from "next";
// si tienes lista de posts en data/posts, descomenta la import y úsala;
// import posts from "@/data/posts";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://danielreyna.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/servicios",
    "/tienda",
    "/blog",
    "/agenda",
    "/sobre-mi",
  ].map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  // Si tienes posts en data/posts con slug:
  // const blogRoutes = posts.map((p) => ({
  //   url: `${baseUrl}/blog/${p.slug}`,
  //   lastModified: p.date ? new Date(p.date) : now,
  //   changeFrequency: "monthly",
  //   priority: 0.6,
  // }));

  return [...staticRoutes /*, ...blogRoutes*/];
}
