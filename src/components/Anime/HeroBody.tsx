import { w } from 'windstitch';

import { removeListDuplicates } from '@/helper/formater';
import { HatennaAnime } from '@/@Types/Hatenna';

const HeroBodyStyle = {
  container: w.div('relative flex w-full flex-col gap-2 px-2'),
  titles: w.p('-mt-24 flex flex-col gap-1 font-medium text-primary'),
  title: w.p('min-h-[64px] py-8 text-2xl font-bold text-white'),
  divider: w.span('my-2 h-0.5 border-t-0 bg-primary opacity-20'),
  synopsis: w.span('text-justify indent-4 text-sm tracking-wide'),
  genres: w.span('flex flex-wrap gap-2'),
  genre: w.span(
    'select-none border border-primary-button border-opacity-25 px-3 py-2 text-xs font-medium',
  ),
};

interface HeroBodyProps {
  data: HatennaAnime;
}

export function HeroBody({ data }: HeroBodyProps) {
  const genres = removeListDuplicates(data.genres);

  return (
    <HeroBodyStyle.container>
      <HeroBodyStyle.titles>
        <HeroBodyStyle.title>{data.title.original}</HeroBodyStyle.title>
        <h2>{data.title.english}</h2>
        <h2>{data.title.japanese}</h2>
        <h2>{data.title.synonyms}</h2>
      </HeroBodyStyle.titles>

      <HeroBodyStyle.divider></HeroBodyStyle.divider>

      <HeroBodyStyle.synopsis>{data.synopsis}</HeroBodyStyle.synopsis>

      <HeroBodyStyle.divider></HeroBodyStyle.divider>

      <HeroBodyStyle.genres>
        {genres.map((name) => (
          <HeroBodyStyle.genre key={name}>{name}</HeroBodyStyle.genre>
        ))}
      </HeroBodyStyle.genres>
    </HeroBodyStyle.container>
  );
}
