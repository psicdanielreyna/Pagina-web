// app/page.tsx
import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import UltimoBlog from "@/components/UltimoBlog";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />

      <Recursos />

      <UltimoBlog />
    </div>
  );
}
