import { Box } from "@/components/Box";
import { HatennaAnime } from "@/@Types/Hatenna";

interface HeroBodyProps {
  data: HatennaAnime;
}

export function HeroBody({ data }: HeroBodyProps) {
  return (
    <section className="relative flex w-full flex-col gap-2 px-2">
      <div className="-mt-24 flex flex-col gap-1 font-medium text-primary">
        <h1 className="min-h-[64px] py-8 text-2xl font-bold text-white">
          {data.title.original}
        </h1>
        <h2>{data.title.english}</h2>
        <h2>{data.title.japanese}</h2>
        <h2>{data.title.synonyms}</h2>
      </div>

      <div className="my-2 h-0.5 border-t-0 bg-primary opacity-20"></div>

      <p className="text-justify indent-4 text-sm tracking-wide">
        {data.synopsis}
      </p>

      <div className="my-2 h-0.5 border-t-0 bg-primary opacity-20"></div>

      <div className="flex flex-wrap gap-2">
        {data.genres.map((genre) => (
          <span
            key={genre}
            className="select-none border border-primary-button border-opacity-25 px-3 py-2 text-xs font-medium"
          >
            {genre}
          </span>
        ))}
      </div>
    </section>
  );
}
