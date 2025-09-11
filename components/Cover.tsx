import Image from "next/image";

export default function Cover({ src, alt }: { src: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" priority />
    </div>
  );
}