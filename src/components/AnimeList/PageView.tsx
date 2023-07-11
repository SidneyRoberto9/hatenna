import Link from 'next/link';
import Image from 'next/image';
import { Fjalla_One } from 'next/font/google';

import { HatennaAnime } from '@prisma/client';
import { AnimeList } from '@/components/AnimeList/List';

const fjalla_One = Fjalla_One({ subsets: ['latin'], weight: ['400'] });

interface AnimeListProps {
  name: string;
  poster: string;
  animes: HatennaAnime[];
}

export function AnimePageView({ name, poster, animes }: AnimeListProps) {
  return (
    <article className="flex h-screen items-center justify-center">
      <section className="fixed top-0 z-0 h-52 w-full bg-primary-button"></section>

      <section className="z-10 h-full w-full max-w-5xl text-secondary-button">
        <div
          className={`${fjalla_One.className} my-2 flex h-12 w-full items-center justify-between bg-primary-button`}>
          <Link href={'/'} prefetch={false} className="cursor-pointer text-5xl font-bold">
            Hatenna
          </Link>
          <span className="flex text-lg font-medium capitalize">
            <p className="mx-2 text-xl font-bold underline">{name}</p>
            favorite anime list
          </span>
        </div>

        <div className="overflow-hidden rounded-md border border-primary-button/20 bg-secondary-button shadow-2xl">
          <div className="h-auto w-full  border-[1rem] border-secondary-button">
            <Image
              src={poster}
              alt="Anime Poster"
              width={1}
              height={1}
              sizes="100vh"
              quality={100}
              priority
              className="h-auto w-full overflow-hidden rounded-md border bg-primary-button/20 object-cover"
            />
          </div>

          <div className=" h-0.5 border-t-0 bg-primary-button/50 opacity-20"></div>

          <div className="h-auto bg-secondary-button p-4">
            <div className="relative w-full bg-primary-button py-2 text-center text-xl font-bold text-secondary-button">
              ANIMES
              <div className="m-auto text-xs">
                Total: <span className="font-medium">{animes.length}</span>
              </div>
            </div>

            <div className="w-full">
              <AnimeList animeList={animes} />
            </div>
          </div>
        </div>

        <div className="mt-2 h-6"></div>
      </section>
    </article>
  );
}
