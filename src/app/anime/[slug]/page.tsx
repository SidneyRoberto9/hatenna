import Image from "next/image";

import { getAnimeData } from "@/server/anime-data";
import { Box } from "@/components/Box";
import { Statistics } from "@/components/Anime/Statistics";
import { Poster } from "@/components/Anime/Poster";
import { HeroBody } from "@/components/Anime/HeroBody";
import { FavoriteButton } from "@/components/Anime/FavoriteButton";
import { DataInfo } from "@/components/Anime/DataInfo";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const animeData = await getAnimeData(params.slug);

  return (
    <article className="mb-8 w-full">
      <Poster alt={animeData.title.canonical} image={animeData.image.cover} />

      <main className="m-auto flex max-w-5xl gap-4">
        <section className="relative -mt-20 h-72 w-52 max-lg:m-8">
          <Image
            src={animeData.image.poster}
            alt={animeData.title.canonical}
            width={1920}
            height={1080}
            priority
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
            <FavoriteButton isFavorite={false} />

            <div className="my-2 h-0.5 border-t-0 bg-primary opacity-20"></div>
            <DataInfo label="status" data={animeData.status} />
            <DataInfo label="aired" data={animeData.aired} />
            <DataInfo
              label="aired"
              data={`${animeData.season} - ${animeData.year}`}
            />
            <DataInfo label="broadcast" data={animeData.broadcast} />
            <DataInfo label="producers" data={animeData.producers} />
            <DataInfo label="licensors" data={animeData.licensors} />
            <DataInfo label="studios" data={animeData.studios} />
            <DataInfo label="source" data={animeData.source} />
          </Box>
        </section>
      </main>
    </article>
  );
}
