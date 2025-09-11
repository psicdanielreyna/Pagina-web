// components/NewsletterSection.tsx
"use client";

import { usePathname } from "next/navigation";
import Newsletter from "@/components/Newsletter";

export default function NewsletterSection() {
  const pathname = usePathname();

  // Solo en home ("/") y en listado de blog ("/blog")
  const show = pathname === "/" || pathname === "/blog";
  if (!show) return null;

  return (
    <section className="flex justify-center my-16">
      <div className="w-full max-w-lg px-4 md:px-6">
        <Newsletter />
      </div>
    </section>
  );
}
