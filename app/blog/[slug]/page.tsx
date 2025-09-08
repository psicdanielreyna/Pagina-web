import { notFound } from "next/navigation";
import { getPostHtml } from "@/lib/posts";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPostHtml(params.slug);
  if (!data) notFound();

  const { meta, content } = data;

  // 👇 asegurar strings para la fecha
  const d = new Date(meta.date ?? "");
  const isValid = !Number.isNaN(d.getTime());
  const dateISO = isValid ? d.toISOString() : "";
  const dateLabel = isValid
    ? d.toLocaleString("es-MX", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      })
    : meta.date || "";

  return (
    <article className="prose mx-auto px-4 py-8">
      <h1>{meta.title}</h1>

      <p className="text-sm text-neutral-500">
        <time dateTime={dateISO}>{dateLabel}</time>
      </p>

      {meta.image ? (
        <img
          src={meta.image}
          alt={meta.title}
          className="rounded-xl my-6 w-full h-auto"
        />
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}