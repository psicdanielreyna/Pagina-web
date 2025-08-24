import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity.image';
import groq from 'groq';

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "date": coalesce(date, _createdAt),
  cover{asset, alt},
  content
}`;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) {
    return <div className="container py-10">No encontrado.</div>;
  }

  const date = new Date(post.date);
  const fecha = isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <article className="container py-10 prose prose-neutral max-w-none">
      <h1>{post.title}</h1>
      {fecha && <p className="text-sm text-muted-foreground">{fecha}</p>}

      {post.cover?.asset && (
        <div className="my-6">
          <Image
            src={urlFor(post.cover).width(1600).height(900).fit('crop').url()}
            alt={post.cover?.alt || 'Portada'}
            width={1600}
            height={900}
            className="rounded-xl"
            priority
          />
        </div>
      )}

      {Array.isArray(post.content) && post.content.length > 0 ? (
        <PortableText value={post.content} />
      ) : (
        <p>Próximamente…</p>
      )}
    </article>
  );
}
