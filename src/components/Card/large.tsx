import Link from 'next/link';
import Image from 'next/image';

import { LargeCardAnimeList, CardContent } from '@/@Types/Card';

interface LargeCardProps {
  attributes: CardContent | LargeCardAnimeList;
}

export function LargeCard({ attributes }: LargeCardProps) {
  return (
    <Link
      href={`/anime/${attributes.id}`}
      className="flex h-60 w-full overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-60 w-full">
        <Image
          src={attributes.banner}
          alt={attributes.id as string}
          width={1024}
          height={240}
          loading="lazy"
          className="h-auto w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-12 w-full justify-between gap-2 bg-primary/75 px-1 py-2 text-base text-secondary">
          <h4 className="ml-4">
            {attributes.title} - {attributes.year}
          </h4>

          <div className="flex gap-2">
            <h4>{attributes.episodies}</h4>
            <h5>Episodes</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
