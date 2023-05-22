export interface HatennaAnime {
  title: Title;
  image: Image;
  slug: string;
  duration: string;
  score: string;
  rank: number;
  popularity: number;
  members: number;
  episodes: number;
  synopsis: string;
  status: string;
  aired: string;
  season: string;
  year: number;
  broadcast: string;
  producers: string;
  licensors: string;
  studios: string;
  source: string;
  genres: string[];
}

interface Title {
  original: string;
  canonical: string;
  synonyms: string;
  english: string;
  japanese: string;
}

interface Image {
  poster: string;
  cover: string;
}

interface HatennaAnimeData {
  animeData: HatennaAnime;
  isFromPrisma: boolean;
}
