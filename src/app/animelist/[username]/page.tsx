import { redirect } from "next/navigation";

import { HatennaAnime } from "@prisma/client";
import { prisma } from "@/server/prisma";
import { AnimePageView } from "@/components/AnimeList/PageView";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageProps) {
  const animeList = await getFavoriteAnimeList(params.username);

  return (
    <div>
      <AnimePageView
        name={params.username}
        poster={getRandomPoster(animeList)}
        animes={animeList}
      />
    </div>
  );
}

function getRandomPoster(animesList: HatennaAnime[]) {
  return animesList[Math.floor(Math.random() * animesList.length)].image.cover;
}

async function getFavoriteAnimeList(name: string) {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (!user) {
    return redirect("/");
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
