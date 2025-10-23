export const metadata = { title: "¡Gracias!", robots: { index: false } };

export default function GraciasOpiniones() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">¡Gracias por tu opinión!</h1>
      <p className="mt-2 text-slate-700">
        La revisaremos y, si cumple nuestras políticas, la publicaremos pronto.
      </p>
    </main>
  );
}