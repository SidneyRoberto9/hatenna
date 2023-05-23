"use client";

import { useState } from "react";
import { StretchHorizontal, LayoutList, LayoutGrid } from "lucide-react";

import { HatennaAnime } from "@prisma/client";
import { SmallCard } from "@/components/Card/Small";
import { MediumCard } from "@/components/Card/Medium";
import { LargeCard } from "@/components/Card/large";
import { LayoutCartType } from "@/@Types/Card";

interface CardListProps {
  animeList: HatennaAnime[];
}

export function AnimeList({ animeList }: CardListProps) {
  const [layoutCardType, setLayoutCardType] = useState<LayoutCartType>("grid");

  const hasAnimes: boolean = animeList.length > 0;

  const gridClass: string =
    "my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";

  const stretchClass: string = "my-8 flex flex-col gap-6";

  const aroundClass: string =
    "my-10 grid w-full gap-10 md:grid-cols-1 lg:grid-cols-2";

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="m-0  mt-3 flex gap-2">
        <LayoutGrid
          size={20}
          className="cursor-pointer text-primary-button"
          onClick={() => setLayoutCardType("grid")}
        />
        <LayoutList
          size={20}
          className="cursor-pointer text-primary-button"
          onClick={() => setLayoutCardType("around")}
        />
        <StretchHorizontal
          size={20}
          className="cursor-pointer text-primary-button"
          onClick={() => setLayoutCardType("stretch")}
        />
      </div>

      <section className="w-full">
        {hasAnimes && (
          <div
            className={
              layoutCardType === "grid"
                ? gridClass
                : layoutCardType === "stretch"
                ? stretchClass
                : aroundClass
            }
          >
            {layoutCardType === "grid" &&
              animeList.map((card) => (
                <SmallCard
                  key={card.slug}
                  attributes={{
                    slug: card.slug,
                    image: card.image.poster,
                    title: card.title.original,
                  }}
                />
              ))}

            {layoutCardType === "around" &&
              animeList.map((card) => (
                <MediumCard
                  key={card.slug}
                  attributes={{
                    slug: card.slug,
                    image: card.image.poster,
                    title: card.title.original,
                    synopsis: card.synopsis,
                    status: card.status,
                    endDate: card.aired,
                    startDate: undefined,
                    episodeCount: card.episodes,
                  }}
                />
              ))}

            {layoutCardType === "stretch" &&
              animeList.map((card) => (
                <LargeCard
                  key={card.slug}
                  attributes={{
                    slug: card.slug,
                    post_image: card.image.cover,
                    title: card.title.original,
                    episodeCount: card.episodes,
                  }}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}