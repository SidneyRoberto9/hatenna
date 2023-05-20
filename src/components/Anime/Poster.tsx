import Image from "next/image";

interface PosterProps {
  image: string;
  alt: string;
}

export function Poster({ image, alt }: PosterProps) {
  return (
    <header className="relative h-100 w-full shadow-md">
      <Image
        src={image}
        alt={alt}
        width={1600}
        height={1080}
        quality={100}
        priority
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 top-0 w-full bg-black/25"></div>
    </header>
  );
}
