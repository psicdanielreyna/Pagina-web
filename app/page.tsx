import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import BlogHome from "@/components/BlogHome";
import Newsletter from "@/components/Newsletter";

export default function Page() {
  return (
    <main className="space-y-12 md:space-y-16">
      <Hero />
      <Recursos />
      <BlogHome />
      <Newsletter />
    </main>
  );
}
