import { redirect } from 'next/navigation';

import { HatennaAnime } from '@prisma/client';
import { prisma } from '@/server/prisma';
import { AnimePageView } from '@/components/AnimeList/PageView';

interface PageProps {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageProps) {
  const animeList = await getFavoriteAnimeList(params.username);

  return (
    <AnimePageView name={params.username} poster={getRandomPoster(animeList)} animes={animeList} />
  );
}

function getRandomPoster(animesList: HatennaAnime[]) {
  if (animesList.length === 0) {
    return 'https://wallpapercave.com/wp/wp5313865.jpg';
  }
  return animesList[Math.floor(Math.random() * animesList.length)].image.poster;
}

async function getFavoriteAnimeList(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (!user) {
    return redirect('/');
  }

  const animeSlugList = await prisma.favoriteAnimes.findMany({
    where: {
      userEmail: user.email,
    },
    select: {
      animeSlug: true,
    },
  });

  const animeList = await prisma.hatennaAnime.findMany({
    where: {
      slug: {
        in: animeSlugList.map((anime) => anime.animeSlug),
      },
    },
  });

  return animeList;
}
