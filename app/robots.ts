// app/robots.ts
import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://danielreyna.netlify.app";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://danielreyna.com/sitemap.xml",
  };
}