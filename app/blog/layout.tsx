// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No pintamos encabezado aquí; solo envolvemos el contenido de /blog
  return <>{children}</>;
}
