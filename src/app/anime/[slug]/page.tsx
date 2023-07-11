import Image from 'next/image';
import { getServerSession } from 'next-auth';

import { Divider } from '@/styles/Divider';
import { Box } from '@/styles/Box';
import { prisma } from '@/server/prisma';
import { authOptions } from '@/server/auth';
import { getAnimeData } from '@/server/anime-data';
import { Header } from '@/components/Header/Header';
import { Statistics } from '@/components/Anime/Statistics';
import { Poster } from '@/components/Anime/Poster';
import { HeroBody } from '@/components/Anime/HeroBody';
import { FavoriteButton } from '@/components/Anime/FavoriteButton';
import { DataInfo } from '@/components/Anime/DataInfo';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  const { animeData, isFromPrisma } = await getAnimeData(params.slug);

  if (!isFromPrisma) {
    await prisma.hatennaAnime.create({
      data: {
        ...animeData,
        slug: animeData.slug,
      },
    });
  }

  const isFavorite = await prisma.favoriteAnimes.findFirst({
    where: {
      animeSlug: animeData.slug,
      userEmail: session?.user?.email as string,
    },
  });

  const airedDate: string = `${animeData.season} - ${animeData.year}`;

  return (
    <div className="mb-8 w-full">
      <Header session={session} shadow />
      <Poster alt={animeData.title.canonical} image={animeData.image.poster} />

      <main className="m-auto flex max-w-5xl gap-4">
        <section className="relative -mt-32 h-72 w-52 max-lg:m-8">
          <Image
            src={animeData.image.cover}
            alt={animeData.title.canonical}
            width={1920}
            height={1080}
            priority={true}
            className="h-full w-full rounded-sm object-cover shadow-lg"
          />
          <Statistics data={animeData} />
          <Box className="flex w-full flex-col gap-2 py-2 text-sm">
            <DataInfo label="episodes" data={animeData.episodes} />
            <DataInfo label="duration" data={animeData.duration} />
          </Box>
        </section>

        <HeroBody data={animeData} />

        <section className="mt-5 w-96">
          <Box className="flex w-full flex-col gap-3 text-sm">
            {session && (
              <>
                <FavoriteButton
                  isFavorite={!!isFavorite}
                  slug={animeData.slug}
                  email={session?.user?.email as string}
                />
                <Divider />
              </>
            )}

            <DataInfo label="status" data={animeData.status} />
            <DataInfo label="aired" data={animeData.aired} />
            <DataInfo label="aired" data={airedDate} />
            <DataInfo label="broadcast" data={animeData.broadcast} />
            <DataInfo label="producers" data={animeData.producers} />
            <DataInfo label="licensors" data={animeData.licensors} />
            <DataInfo label="studios" data={animeData.studios} />
            <DataInfo label="source" data={animeData.source} />
          </Box>
        </section>
      </main>
    </div>
  );
}
