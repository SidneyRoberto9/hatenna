import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { HatennaAnime } from "@prisma/client";
import { prisma } from "@/server/prisma";
import { authOptions } from "@/server/auth";
import { AnimePageView } from "@/components/AnimeList/PageView";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function Page({ params }: PageProps) {
  const animeList = await getFavoriteAnimeList(params.username);

  return (
    <>
      <AnimePageView
        name={params.username}
        poster={getRandomPoster(animeList)}
        animes={animeList}
      />
    </>
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
