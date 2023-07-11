export type LayoutCartType = 'grid' | 'stretch' | 'around';

export interface CardAtributes {
  title: string;
  slug: string;
  synopsis: string;
  rating: string; //averageRating
  startDate: string;
  endDate: string;
  status: string;
  image: string;
  post_image: string;
  episodeCount: number;
}

export interface CardContent {
  id: string | number;
  title: string;
  image: string;
  banner: string;
  episodies: number;
  year: number;
  synopsis: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  color: string;
}

export interface SmallCardAnimeList {
  id: string | number;
  image: string;
  title: string;
}

export interface LargeCardAnimeList {
  id: string | number;
  banner: string;
  title: string;
  episodies: number;
  year: number;
}

export interface MediumCardAnimeList {
  id: string | number;
  image: string;
  title: string;
  synopsis: string;
  status: string;
  episodies: number;
  startDate: string | null;
  endDate: string | null;
}
