// components/ui/HeroAbout.tsx
import Image from "next/image";

type Props = {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
};

export default function HeroAbout({ title, subtitle, imageSrc, imageAlt = "" }: Props) {
  return (
    <section className="relative w-full">
      <div className="relative h-[42vh] sm:h-[55vh] lg:h-[72vh] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <span className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-medium tracking-wide text-zinc-700 backdrop-blur-sm">
              Sobre mí
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
