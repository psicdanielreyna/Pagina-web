import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import LatestBlog from "@/components/LatestBlog";

export default function HomePage() {
  return (
    <div className="space-y-16 mb-16"> {/* 👈 separa blog del footer */}
      <Hero />
      <Recursos />
      <LatestBlog />
    </div>
  );
}
