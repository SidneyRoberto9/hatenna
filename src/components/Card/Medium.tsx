'use client';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

import { MediumCardAnimeList, CardContent } from '@/@Types/Card';

interface MediumCardProps {
  attributes: CardContent | MediumCardAnimeList;
}

export function MediumCard({ attributes }: MediumCardProps) {
  return (
    <Link
      href={`/anime/${attributes.id}`}
      className="flex h-72 w-118 max-w-5xl overflow-hidden rounded-md bg-secondary text-primary shadow-lg">
      <div className="relative h-72 w-48">
        <Image
          src={attributes.image}
          alt={attributes.id as string}
          width={192}
          height={288}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <section className="relative w-[17.5rem] ">
        <h1 className="flex items-center justify-center m-2  px-2 h-16 overflow-hidden text-center text-sm bg-zinc-100 rounded-md">
          {attributes.title}
        </h1>
        <div className="flex flex-col gap-2 p-2 text-sm">
          <span>Synopsis:</span>
          <span
            className="line-clamp-4 indent-2 text-xs text-primary-button"
            dangerouslySetInnerHTML={{ __html: attributes.synopsis }}></span>
        </div>

        <div className="flex gap-2 px-2 text-sm">
          <span>Status:</span>
          <span className="capitalize text-primary-button">{attributes.status}</span>
        </div>

        <div className="flex gap-2 px-2 text-sm">
          <span>Episodes:</span>
          <span className="text-primary-button">{attributes.episodies}</span>
        </div>

        <div className="absolute bottom-0 flex w-full items-center justify-center gap-2 p-2 text-xs font-medium">
          {attributes.endDate == null || attributes.endDate == undefined ? (
            <span>{attributes.startDate}</span>
          ) : (
            <>
              <span>{dayjs(attributes.startDate).format('DD, MMMM YYYY') || '??'}</span>
              <span>-</span>
              <span>{dayjs(attributes.endDate).format('DD, MMMM YYYY') || '??'}</span>
            </>
          )}
        </div>
      </section>
    </Link>
  );
}
