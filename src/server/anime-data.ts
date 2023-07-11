import dayjs from 'dayjs';

import { getOne } from '@/server/query/getOne';
import { prisma } from '@/server/prisma';
import { AniListApi } from '@/server/api';
import {
  textFormatter,
  removeListDuplicates,
  formatAniListSearchDate,
  convertDuration,
} from '@/helper/formater';
import { HatennaAnimeData, HatennaAnime } from '@/@Types/Hatenna';
import { GetOneResponseData } from '@/@Types/AniList';

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

  const { data } = await AniListApi.post('', getOne(slug));
  const aniListData = data.data.Media as GetOneResponseData;

  const rank = aniListData.rankings.filter(
    (ranking) => ranking.allTime && ranking.type == 'POPULAR',
  )[0]!;

  const formattedData: HatennaAnime = {
    slug: String(aniListData.id),
    title: {
      original: aniListData.title.romaji,
      canonical: aniListData.title.romaji,
      japanese: aniListData.title.native,
      synonyms: '',
      english: aniListData.title.english,
    },
    image: {
      poster:
        aniListData.bannerImage == null
          ? 'https://wallpapercave.com/wp/wp5313865.jpg'
          : aniListData.bannerImage,
      cover: aniListData.coverImage.large,
    },
    duration: convertDuration(aniListData.episodes, aniListData.duration),
    score: String(aniListData.averageScore),
    rank: rank?.rank || 0,

    popularity: aniListData.popularity,
    members: aniListData.favourites,
    episodes: aniListData.episodes,
    synopsis: aniListData.description || '',
    status: textFormatter(aniListData.status),
    aired: `${
      dayjs(formatAniListSearchDate(aniListData.startDate)).format('DD, MMMM YYYY') || '??'
    } to ${dayjs(formatAniListSearchDate(aniListData.endDate)).format('DD, MMMM YYYY') || '??'}`,
    season: textFormatter(aniListData.season),
    year: aniListData.seasonYear,
    broadcast: 'N/A',
    producers: aniListData.studios.nodes
      .map((producer, index) => {
        if (!aniListData.studios.edges[index].isMain) {
          return producer.name;
        }
        return '';
      })
      .filter((producer) => producer !== '')
      .join(', '),
    licensors: 'N/A',
    studios: aniListData.studios.nodes
      .map((producer, index) => {
        if (aniListData.studios.edges[index].isMain) {
          return producer.name;
        }
        return '';
      })
      .filter((producer) => producer !== '')
      .join(', '),
    genres: removeListDuplicates([
      ...aniListData.genres,
      ...aniListData.tags.map((tag) => tag.name),
    ]),
    source: textFormatter(aniListData.source),
  };

  return {
    animeData: formattedData,
    isFromPrisma: false,
  };
}
// Old code
// const { KitsuAnimeData, kitsuAnimeGenres } = await getDataFromKitsuWithSlug(slug);

//   const JikanAnimeData = await getDataFromJikanWithName(selectSearchTitle(KitsuAnimeData));

//   const formattedAnimeData: HatennaAnime = {
//     slug: KitsuAnimeData.slug,
//     title: {
//       original: JikanAnimeData?.title || '',
//       canonical: KitsuAnimeData.titles.en_jp || '',
//       japanese: JikanAnimeData.title_japanese || '',
//       synonyms: JikanAnimeData.title_synonyms[0] || '',
//       english: JikanAnimeData.title_english || KitsuAnimeData.titles.en_jp,
//     },
//     image: {
//       poster: KitsuAnimeData.posterImage.original || '',
//       cover: selectKitsuCoverImage(KitsuAnimeData),
//     },
//     duration: convertDuration(KitsuAnimeData.totalLength, KitsuAnimeData.episodeLength),
//     score: String(JikanAnimeData.score || 'N/A'),
//     rank: JikanAnimeData.rank || 0,
//     popularity: JikanAnimeData.popularity,
//     members: JikanAnimeData.members,
//     episodes: JikanAnimeData.episodes || 0,
//     synopsis: JikanAnimeData.synopsis || '',
//     status: JikanAnimeData.status,
//     aired: JikanAnimeData.aired.string,
//     season: JikanAnimeData.season || '',
//     year: JikanAnimeData.year || 0,
//     broadcast: JikanAnimeData.broadcast.string || 'N/A',
//     producers: JikanAnimeData.producers.map((producer) => producer.name).join(', '),
//     licensors: JikanAnimeData.licensors.map((licensor) => licensor.name).join(', '),
//     studios: JikanAnimeData.studios.map((studio) => studio.name).join(', '),
//     genres: kitsuAnimeGenres,
//     source: JikanAnimeData.source,
//   };

// function getKitsuGenres(data: any[]) {
//   if (data == null || data.length <= 0) {
//     return [];
//   }

//   const uniqueGenres: string[] = [];

//   const genres: string[] = data
//     .map((included) => {
//       if (included.type === 'genres') {
//         return included.attributes.name;
//       } else if (included.type === 'categories') {
//         return included.attributes.title;
//       }
//     })
//     .filter((genre) => genre !== undefined || genre !== null);

//   genres.forEach((genre) => {
//     if (!uniqueGenres.includes(genre)) {
//       uniqueGenres.push(genre);
//     }
//   });

//   return uniqueGenres;
// }

// async function getDataFromKitsuWithSlug(slug: string) {
//   const { data } = await kitsuApi.get<Kitsu>(
//     `anime?filter[slug]=${slug}&include=genres,categories`,
//   );

//   return {
//     KitsuAnimeData: data.data[0].attributes,
//     kitsuAnimeGenres: getKitsuGenres(data.included),
//   };
// }

// async function getDataFromJikanWithName(name: string) {
//   const { data } = await JikanApi.get<Jikan>(`anime?q=${name}`);

//   return data.data[0];
// }

// function selectKitsuCoverImage(KitsuAnimeData: KitsuAnime) {
//   if (KitsuAnimeData.coverImage == null) {
//     return '';
//   } else if (KitsuAnimeData.coverImage.original == null) {
//     return KitsuAnimeData.coverImage.large;
//   } else if (KitsuAnimeData.coverImage.large == null) {
//     return KitsuAnimeData.coverImage.medium;
//   } else if (KitsuAnimeData.coverImage.medium == null) {
//     return KitsuAnimeData.coverImage.small;
//   }

//   return '';
// }

// function selectSearchTitle(KitsuAnimeData: KitsuAnime) {
//   if (KitsuAnimeData.canonicalTitle == null) {
//     return KitsuAnimeData.titles.en_jp;
//   } else if (KitsuAnimeData.titles.en_jp == null) {
//     return KitsuAnimeData.titles.en;
//   } else if (KitsuAnimeData.titles.en == null) {
//     return KitsuAnimeData.titles.en_us;
//   } else if (KitsuAnimeData.titles.en_us == null) {
//     return KitsuAnimeData.titles.ja_jp;
//   }

//   return KitsuAnimeData.canonicalTitle;
// }
