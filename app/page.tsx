// app/page.tsx
import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import UltimoBlog from "@/components/UltimoBlog";
import Newsletter from "@/components/Newsletter";
import LatestBlog from "@/components/LatestBlog";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <Recursos />
      <LatestBlog />
      <Newsletter />   {/* <--- Newsletter abajo del blog */}
    </div>
  );
}
