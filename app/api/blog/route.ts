// app/api/blog/route.ts
import { NextResponse } from "next/server";
import Parser from "rss-parser";

type Item = {
  title: string;
  link: string;
  isoDate?: string;
  contentSnippet?: string;
  enclosure?: { url?: string };
};
// app/api/blog/route.ts
export const dynamic = "force-dynamic";

// ...tu handler GET aquí (puede usar request.url sin romper el build)

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit") ?? "3");

    const parser = new Parser<{}, Item>();
    // Ajusta si el feed real es /rss o similar
    const feed = await parser.parseURL("https://robertomtz.com/feed");

    const items = (feed.items ?? [])
      .slice(0, limit)
      .map((p) => ({
        title: p.title ?? "",
        link: p.link ?? "#",
        date: p.isoDate ?? "",
        excerpt: p.contentSnippet ?? "",
        image: p.enclosure?.url ?? "",
      }));

    return NextResponse.json({ items });
  } catch (err) {
    console.error("RSS error:", err);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
