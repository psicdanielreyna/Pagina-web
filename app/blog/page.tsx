import { getPostsMeta } from "@/lib/posts";

export default function BlogPage() {
  const posts = getPostsMeta();

  if (!posts.length) {
    return (
      <section className="prose mx-auto px-4 py-8">
        <h1>Blog</h1>
        <p>No hay artículos todavía.</p>
      </section>
    );
  }

  return (
    <section className="prose mx-auto px-4 py-8">
      <h1>Blog</h1>

      <ul className="list-none space-y-8 p-0">
        {posts.map((post) => {
          const d = new Date(post.date ?? "");
          const isValid = !Number.isNaN(d.getTime());
          const dateISO = isValid ? d.toISOString() : "";
          const dateLabel = isValid
            ? d.toLocaleDateString("es-MX", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })
            : post.date || "";

          return (
            <li key={post.slug} className="border rounded-xl p-4">
              <h2 className="m-0">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>

              <p className="text-sm text-neutral-500 m-0">
                <time dateTime={dateISO}>{dateLabel}</time>
              </p>

              {post.description && <p className="m-0">{post.description}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}