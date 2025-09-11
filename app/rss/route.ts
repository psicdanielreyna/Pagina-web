// app/rss/route.ts
import { NextResponse } from "next/server";
import RSS from "rss";
import { getAllPostsMeta } from "@/lib/posts";

export async function GET() {
  const site = "https://danielreyna.com"; // cambia a tu dominio final
  const feed = new RSS({
    title: "Blog – Daniel Reyna",
    site_url: site,
    feed_url: `${site}/rss`,
    language: "es-MX",
  });

  const posts = await getAllPostsMeta();
  posts.forEach((p) => {
    feed.item({
      title: p.title ?? p.slug,
      url: `${site}/blog/${p.slug}`,
      date: p.date ?? new Date().toISOString(),
      description: p.excerpt ?? "",
    });
  });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}