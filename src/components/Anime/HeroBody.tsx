import { Box } from '@/components/Box';
import { HatennaAnime } from '@/@Types/Hatenna';

interface HeroBodyProps {
  data: HatennaAnime;
}

export function HeroBody({ data }: HeroBodyProps) {
  return (
    <section className="relative flex w-full flex-col gap-4">
      <div className=" -mt-24 flex flex-col gap-1 font-medium text-primary">
        <h1 className="py-8 text-2xl font-bold text-white">
          {data.title.original}
        </h1>
        <h2>{data.title.english}</h2>
        <h2>{data.title.japanese}</h2>
        <h2>{data.title.synonyms}</h2>
      </div>

      <Box className="p-6">
        <p className="text-justify indent-4 text-sm tracking-wide">
          {data.synopsis}
        </p>
      </Box>

      <div className="flex flex-wrap gap-1">
        {data.genres.map((genre) => (
          <Box className="select-none border border-primary-button border-opacity-25 px-2 py-1 text-xs font-medium">
            {genre}
          </Box>
        ))}
      </div>
    </section>
  );
}
