import { NextResponse } from "next/server";
import RSS from "rss";
import { getAllPostsMeta } from "@/lib/posts";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://danielreyna.com";

export async function GET() {
  const feed = new RSS({
    title: "Blog | Daniel Reyna",
    site_url: SITE,
    feed_url: `${SITE}/rss`,
    language: "es-MX",
  });

  const posts = await getAllPostsMeta();

  posts
    .slice()
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : 0;
      const tb = b.date ? new Date(b.date).getTime() : 0;
      return tb - ta;
    })
    .forEach((p) => {
      feed.item({
        title: p.title ?? p.slug,
        url: `${SITE}/blog/${p.slug}`,
        date: p.date ? new Date(p.date) : new Date(),
        description: p.excerpt ?? "",
      });
    });

  return new NextResponse(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
