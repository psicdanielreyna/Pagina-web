// app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Recursos from "@/components/Recursos";
import LatestBlog from "@/components/LatestBlog";

export const metadata: Metadata = {
  title: "Daniel Reyna - Psicólogo | Psicólogo en Monterrey",
  description:
    "Daniel Reyna - Psicólogo en Monterrey. Terapia cognitivo-conductual online y presencial para ansiedad, duelo y autoestima.",
  alternates: {
    canonical: "https://danielreyna.com/",
  },
  openGraph: {
    title: "Daniel Reyna - Psicólogo | Psicólogo en Monterrey",
    description:
      "Terapia psicológica online y presencial en Monterrey. Ansiedad, duelo y autoestima con enfoque cognitivo-conductual.",
    url: "https://danielreyna.com/",
    siteName: "Daniel Reyna – Psicólogo",
    images: [
      {
        url: "https://danielreyna.com/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Reyna – Psicólogo en Monterrey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Reyna - Psicólogo | Psicólogo en Monterrey",
    description:
      "Terapia psicológica online y presencial en Monterrey. Ansiedad, duelo y autoestima con enfoque cognitivo-conductual.",
    images: ["https://danielreyna.com/og/home.jpg"],
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16 mb-16">
      <Hero />
      <Recursos />
      <LatestBlog />
    </div>
  );
}
