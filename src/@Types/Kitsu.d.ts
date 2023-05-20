export interface Kitsu {
  data: KitsuAnimeResponse[];
  meta: KitsuMeta;
  included: Array<KitsuIncludeCategory, KitsuIncludeGenre, null>[];
  links: any;
}

export interface KitsuMeta {
  count: number;
}

export interface KitsuAnime {
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;
  titles: any;
  canonicalTitle: string;
  abbreviatedTitles: string[];
  averageRating: string;
  ratingFrequencies: any;
  userCount: number;
  favoritesCount: number;
  startDate: string;
  endDate: string;
  nextRelease: null;
  popularityRank: number;
  ratingRank: number;
  ageRating: string;
  ageRatingGuide: string;
  subtype: string;
  status: string;
  tba: string;
  posterImage: any;
  coverImage: any;
  episodeCount: number;
  episodeLength: number;
  totalLength: number;
  youtubeVideoId: string;
  showType: string;
  nsfw: boolean;
}

export interface KitsuAnimeResponse {
  id: string;
  type: string;
  links: KitsuLinks;
  attributes: KitsuAnime;
  relationships: any;
}

interface KitsuLinks {
  self: string;
}

export interface KitsuIncludeCategory {
  id: string;
  type: string;
  links: any;
  attributes: KitsuCategoryAttributes;
  relationships: any;
}

export interface KitsuCategoryAttributes {
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  totalMediaCount: number;
  slug: string;
  nsfw: boolean;
  childCount: number;
}

export interface KitsuIncludeGenre {
  id: string;
  type: string;
  links: any;
  attributes: KitsuGenreAttributes;
}

export interface KitsuGenreAttributes {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
}
