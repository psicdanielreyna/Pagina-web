// sanity/schema.ts
import { defineType, defineField } from 'sanity';

const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Resumen', type: 'text' }),
    defineField({ name: 'mainImage', title: 'Imagen principal', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', title: 'Publicado el', type: 'datetime' }),
    defineField({ name: 'body', title: 'Contenido', type: 'array', of: [{ type: 'block' }] }),
  ],
});

const types = [post];

// Export por defecto para usarlo directo en sanity.config.ts
const schema = { types };
export default schema;
