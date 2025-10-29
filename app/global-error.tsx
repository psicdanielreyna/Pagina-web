// app/global-error.tsx
"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h1>Oops, algo salió mal</h1>
        <p>Intenta recargar la página.</p>
        <button onClick={() => reset()}>Reintentar</button>
      </body>
    </html>
  );
}