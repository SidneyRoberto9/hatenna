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
  links: any;
  attributes: KitsuAnime;
  relationships: any;
}
