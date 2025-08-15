// app/blog/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Daniel Reyna",
  description:
    "Ideas prácticas sobre bienestar, ansiedad, autoestima y terapia breve.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[60vh]">
      <header className="border-b">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          <p className="text-neutral-600 mt-2">
            Lecturas breves y aplicables para sentirte mejor.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
