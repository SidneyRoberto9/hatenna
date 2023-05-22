import Link from 'next/link';
import Image from 'next/image';

import { CardAtributes } from '@/@Types/Card';

interface LargeCardProps {
  attributes: CardAtributes;
}

export function LargeCard({ attributes }: LargeCardProps) {
  return (
    <Link
      href={`/anime/${attributes.slug}`}
      prefetch={false}
      className="flex h-60 w-892 max-w-5xl overflow-hidden rounded-lg shadow-lg"
    >
      <div className="relative h-60 w-full">
        <Image
          src={attributes.post_image}
          alt={attributes.slug}
          width={1024}
          height={240}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-12 w-full justify-between gap-2 bg-primary/75 px-1 py-2 text-base text-secondary">
          <h4 className="ml-4">{attributes.title}</h4>
          <div className="flex">
            <h4>{attributes.episodeCount}</h4>
            <h5 className="mx-3">Episodes</h5>
          </div>
        </div>
      </div>
    </Link>
  );
}
