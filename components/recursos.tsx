import Link from "next/link";
import ResourceCard from "./ResourceCard";
import { recursosDestacados } from "@/data/recursos";

export default function Recursos() {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Recursos destacados
          </h2>
          <Link href="/tienda" className="text-green-700 font-medium">
            Ver todos
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recursosDestacados.map((r) => (
            <ResourceCard key={r.slug} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
