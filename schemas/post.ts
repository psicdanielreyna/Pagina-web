import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      // mantiene compatibilidad con el doc viejo y quita el warning;
      // además inicializa la fecha al crear un post nuevo
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'cover',
      title: 'Portada',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt', type: 'string' }],
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt' }] },
      ],
      validation: r => r.required(),
    }),
  ],
});
