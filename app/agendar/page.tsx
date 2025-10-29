// app/agendar/page.tsx
"use client";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function AgendarInner() {
  redirect("/agenda");
  return null; // nunca se renderiza, solo redirige
}

export default function AgendarRedirect() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <AgendarInner />
    </Suspense>
  );
}