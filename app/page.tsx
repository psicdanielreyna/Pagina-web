// app/page.tsx
import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import LatestBlog from "@/components/LatestBlog";
import NewsletterForm from "@/components/NewsletterForm"; // 👈 importa aquí

export default function HomePage() {
  return (
    <div className="space-y-20"> {/* más separación general */}
      <Hero />
      <Recursos />
      <LatestBlog />

      {/* newsletter con espacio extra */}
      <div className="mt-20">
        <NewsletterForm />
      </div>
    </div>
  );
}
