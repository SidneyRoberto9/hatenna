import { w } from 'windstitch';
import Image from 'next/image';

const PosterStyle = {
  header: w.div('relative h-100 w-full shadow-md'),
  img: w(Image, {
    className: 'h-full w-full object-cover',
  }),

  divider: w.span('absolute bottom-0 top-0 w-full bg-black/25'),
};

interface PosterProps {
  image: string;
  alt: string;
}

export function Poster({ image, alt }: PosterProps) {
  return (
    <PosterStyle.header>
      <PosterStyle.img src={image} alt={alt} width={1600} height={1080} quality={100} priority />
      <PosterStyle.divider></PosterStyle.divider>
    </PosterStyle.header>
  );
}
