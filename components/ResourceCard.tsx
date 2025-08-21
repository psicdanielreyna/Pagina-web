import Image from "next/image";
import Link from "next/link";
import type { Recurso } from "@/types/content";

export default function ResourceCard({ r }: { r: Recurso }) {
  return (
    <Link
      href={r.href}
      className="block rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition"
    >
      <div className="p-6">
        <div className="mx-auto relative w-[200px] h-[260px]">
          <Image
            src={r.img}
            alt={r.alt}
            fill
            className="object-contain"
            sizes="200px"
            priority
          />
        </div>
      </div>

      <div className="px-6 pb-6">
        <h3 className="font-semibold text-slate-900">{r.title}</h3>
        <p className="mt-1 text-slate-600 text-sm">{r.excerpt}</p>
        <div className="mt-3">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
            Leer más
          </span>
        </div>
      </div>
    </Link>
  );
}
