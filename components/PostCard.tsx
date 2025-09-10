import Link from "next/link";
import Image from "next/image";

export function PostCard({ post }: { post: {
  slug: string; title: string; excerpt: string; date: string; cover?: string;
}}) {
  return (
    <article className="rounded-xl border shadow-sm bg-white/70 p-4 md:p-5">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          {post.cover && (
            <div className="w-full md:w-72 shrink-0">
              <Image
                src={post.cover}
                alt=""
                width={900}
                height={600}
                className="w-full h-48 md:h-44 object-cover rounded-xl"
                priority={false}
              />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-evergreen group-hover:underline">
              {post.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{post.date}</p>
            <p className="mt-3 text-gray-800">{post.excerpt}</p>
            <span className="mt-3 inline-block underline">Página del artículo…</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
