import Link from "next/link";

export type CardPost = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  cover?: string | null;
  image?: string | null; // por si el parser trae "image"
};

export function PostCard({ post }: { post: CardPost }) {
  const cover = post.cover ?? post.image ?? undefined;

  return (
    <article className="rounded-xl border shadow-sm bg-white/70 p-4 md:p-5">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          {cover && (
            <div className="w-full md:w-72 shrink-0">
              {/* Puedes migrar a next/image cuando quieras */}
              <img
                src={cover}
                alt=""
                className="w-full h-48 md:h-44 object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-evergreen group-hover:underline">
              {post.title}
            </h2>

            {post.date ? (
              <p className="mt-1 text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}

            {post.excerpt && (
              <p className="mt-3 text-gray-800">{post.excerpt}</p>
            )}

            <span className="mt-3 inline-block underline">
              Página del artículo…
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
