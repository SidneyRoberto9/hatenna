export type LayoutCartType = "grid" | "stretch" | "around";

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

export interface SmallCardAnimeList {
  slug: string;
  image: string;
  title: string;
}

export interface LargeCardAnimeList {
  slug: string;
  post_image: string;
  title: string;
  episodeCount: number;
}

export interface MediumCardAnimeList {
  slug: string;
  image: string;
  title: string;
  synopsis: string;
  status: string;
  episodeCount: number;
  endDate: string;
  startDate?: string;
}
