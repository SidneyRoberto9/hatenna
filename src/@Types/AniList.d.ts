export interface SearchResponseData {
  id: number;
  episodes: number;
  bannerImage: string;
  status: string;
  seasonYear: number;
  format: string;
  title: Title;
  coverImage: CoverImage;
  endDate: AniDate;
  startDate: AniDate;
  description: string;
}

export interface GetOneResponseData {
  id: number;
  title: TitleExtended;
  coverImage: CoverImage;
  bannerImage: string;
  episodes: number;
  duration: number;
  averageScore: number;
  rankings: Ranking[];
  popularity: number;
  favourites: number;
  description: string;
  status: string;
  endDate: AniDate;
  startDate: AniDate;
  season: string;
  seasonYear: number;
  studios: Studios;
  genres: string[];
  source: string;
  tags: Tag[];
}

export interface Tag {
  name: string;
}

export interface CoverImage {
  large: string;
  color: string;
}

export interface AniDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface Title {
  romaji: string;
}

export interface EndDateClass {
  year: number;
  month: number;
  day: number;
}

export interface Ranking {
  allTime: boolean;
  type: string;
  context: string;
  rank: number;
}

export interface Studios {
  edges: Edge[];
  nodes: Node[];
}

export interface Edge {
  isMain: boolean;
}

export interface Node {
  name: string;
}

export interface TitleExtended {
  romaji: string;
  english: string;
  native: string;
}
