// components/NewsletterSection.tsx
"use client";

import { usePathname } from "next/navigation";
import Newsletter from "./Newsletter"; // asegúrate de tener este componente

export default function NewsletterSection() {
  const path = usePathname();
  const show = path === "/" || path.startsWith("/blog");
  if (!show) return null;

  return (
    <div className="w-full flex justify-center my-12">
      <Newsletter />
    </div>
  );
}