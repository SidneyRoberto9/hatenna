import { prisma } from '@/server/prisma';
import { JikanApi, kitsuApi } from '@/server/api';
import { convertDuration } from '@/helper/formater';
import { Kitsu } from '@/@Types/Kitsu';
import { Jikan } from '@/@Types/Jikan';
import { HatennaAnimeData, HatennaAnime } from '@/@Types/Hatenna';

export async function getAnimeData(slug: string): Promise<HatennaAnimeData> {
  const prismaAnimeData = await prisma.hatennaAnime.findUnique({
    where: {
      slug: slug,
    },
  });

  if (prismaAnimeData) {
    return {
      animeData: prismaAnimeData,
      isFromPrisma: true,
    };
  }

  const { KitsuAnimeData, kitsuAnimeGenres } = await getDataFromKitsuWithSlug(
    slug
  );
  const JikanAnimeData = await getDataFromJikanWithName(
    KitsuAnimeData.titles.en_jp
  );

  const formattedAnimeData: HatennaAnime = {
    slug: KitsuAnimeData.slug,
    title: {
      original: JikanAnimeData.title || "",
      canonical: KitsuAnimeData.titles.en_jp || "",
      japanese: JikanAnimeData.title_japanese || "",
      synonyms: JikanAnimeData.title_synonyms[0] || "",
      english: JikanAnimeData.title_english || KitsuAnimeData.titles.en_jp,
    },
    image: {
      poster: KitsuAnimeData.posterImage.original || "",
      cover: KitsuAnimeData.coverImage.original || "",
    },
    duration: convertDuration(
      KitsuAnimeData.totalLength,
      KitsuAnimeData.episodeLength
    ),
    score: String(JikanAnimeData.score || "N/A"),
    rank: JikanAnimeData.rank || 0,
    popularity: JikanAnimeData.popularity,
    members: JikanAnimeData.members,
    episodes: JikanAnimeData.episodes || 0,
    synopsis: JikanAnimeData.synopsis || "",
    status: JikanAnimeData.status,
    aired: JikanAnimeData.aired.string,
    season: JikanAnimeData.season || "",
    year: JikanAnimeData.year || 0,
    broadcast: JikanAnimeData.broadcast.string || "N/A",
    producers: JikanAnimeData.producers
      .map((producer) => producer.name)
      .join(", "),
    licensors: JikanAnimeData.licensors
      .map((licensor) => licensor.name)
      .join(", "),
    studios: JikanAnimeData.studios.map((studio) => studio.name).join(", "),
    genres: kitsuAnimeGenres,
    source: JikanAnimeData.source,
  };

  return {
    animeData: formattedAnimeData,
    isFromPrisma: false,
  };
}

function getKitsuGenres(data: any[]) {
  if (data == null || data.length <= 0) {
    return [];
  }

  const genres: string[] = data
    .map((included) => {
      if (included.type === "genres") {
        return included.attributes.name;
      } else if (included.type === "categories") {
        return included.attributes.title;
      }
    })
    .filter((genre) => genre !== undefined || genre !== null);

  return genres;
}

async function getDataFromKitsuWithSlug(slug: string) {
  const { data } = await kitsuApi.get<Kitsu>(
    `anime?filter[slug]=${slug}&include=genres,categories`
  );

  return {
    KitsuAnimeData: data.data[0].attributes,
    kitsuAnimeGenres: getKitsuGenres(data.included),
  };
}

async function getDataFromJikanWithName(name: string) {
  const { data } = await JikanApi.get<Jikan>(`anime?q=${name}`);

  return data.data[0];
}
