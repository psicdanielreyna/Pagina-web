// app/talleres/page.tsx
import type { Metadata } from "next";
import HeroBanner from "@/components/HeroBanner";

export const metadata: Metadata = {
  title: "Talleres | Daniel Reyna",
  description: "Aprende y practica herramientas de TCC en talleres y sesiones grupales.",
  alternates: { canonical: "/talleres" },
};

export default function TalleresPage() {
  return (
    <main>
      <HeroBanner
        badge="Talleres"
        title="Aprende y practica en vivo"
        subtitle="Sesiones prácticas para sentirte mejor en tu día a día. Modalidad online y presencial."
        imageUrl="/talleres-hero.jpg?v=1"  // ← tu imagen en /public
      />

      {/* ...lo demás... */}
    </main>
  );
}