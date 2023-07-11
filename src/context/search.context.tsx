'use client';

import React, { ReactNode, useState, useContext, createContext } from 'react';

import { useMutation } from '@tanstack/react-query';
import { aniListSearch } from '@/server/query/search';
import { AniListApi } from '@/server/api';
import { textFormatter, formatAniListSearchDate } from '@/helper/formater';
import { LayoutCartType, CardContent } from '@/@Types/Card';
import { SearchResponseData } from '@/@Types/AniList';

interface SearchContextProviderProps {
  children: ReactNode;
}

interface SearchContextType {
  isLoading: boolean;
  cardSearch: CardSearch;
  layoutCardType: LayoutCartType;
  search: (value: string) => Promise<void>;
  changeLayoutType: (layout: LayoutCartType) => void;
}

interface CardSearch {
  cards: CardContent[];
  lastSearchValue: string | null;
}

function formatSearchDataFromAniList(data: Array<SearchResponseData>): Array<CardContent> {
  return data.map((anime) => {
    return {
      id: anime.id,
      title: anime.title.romaji,
      image: anime.coverImage.large,
      banner:
        anime.bannerImage == null
          ? 'https://wallpapercave.com/wp/wp5313865.jpg'
          : anime.bannerImage,
      episodies: anime.episodes,
      year: anime.seasonYear,
      synopsis: anime.description,
      status: textFormatter(anime.status),
      startDate: formatAniListSearchDate(anime.startDate),
      endDate: formatAniListSearchDate(anime.endDate),
      color: anime.coverImage.color,
    };
  });
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [layoutType, setLayoutType] = useState<LayoutCartType>('grid');
  const [searchInitialValue, setSearchInitialValue] = useState<CardSearch>({
    cards: [],
    lastSearchValue: null,
  });

  function changeLayoutType(layout: LayoutCartType) {
    setLayoutType(layout);
  }

  const { data, mutate, isLoading } = useMutation({
    mutationFn: searchAnimeInAniList,
  });

  async function search(value: string) {
    if (value === '' || value === null) {
      return;
    }
    mutate(value);
    setSearchInitialValue({
      cards: [],
      lastSearchValue: value,
    });
  }

  return (
    <SearchContext.Provider
      value={{
        search,
        changeLayoutType,
        cardSearch: data == undefined ? searchInitialValue : data,
        isLoading,
        layoutCardType: layoutType,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

async function searchAnimeInAniList(value: string) {
  const { data } = await AniListApi.post('', aniListSearch(value));

  const formattedData = {
    cards: formatSearchDataFromAniList(data.data.Page.media),
    lastSearchValue: value,
  } satisfies CardSearch;

  return formattedData;
}

export function useSearch() {
  const context = useContext(SearchContext);

  return context;
}

// Kitsu Older Search

/*

async function searchAnimeInKitsu(value: string): Promise<CardSearch> {
  // const { data } = await JikanApi.get(`anime?q=${value}&sfw&limit=20`);

  const { data } = await kitsuApi.get(
    `anime?filter[text]=${value}&page[limit]=20&filter[subtype]=TV,ONA`,
  );

  const formattedData = {
    cards: formatSearchFromKitsu(data.data),
    lastSearchValue: value,
  } satisfies CardSearch;

  return formattedData;
}

function formatSearchFromKitsu(data: Array<KitsuAnimeResponse>) {
  const formattedDataList: Array<CardAtributes> = [];

  for (let index = 0; index < data.length; index++) {
    const attributes = data[index].attributes;

    try {
      const formattedData: CardAtributes = {
        title: attributes.canonicalTitle,
        slug: attributes.slug,
        synopsis: attributes.synopsis,
        rating: attributes.averageRating,
        startDate: attributes.startDate,
        endDate: attributes.endDate,
        status: attributes.status,
        image:
          attributes.posterImage.original ||
          attributes.posterImage.large ||
          attributes.posterImage.small ||
          '',
        post_image:
          attributes.coverImage === null
            ? 'https://wallpapercave.com/wp/wp5313865.jpg'
            : attributes.coverImage.original ||
              attributes.coverImage.large ||
              attributes.coverImage.small ||
              'https://wallpapercave.com/wp/wp5313865.jpg',
        episodeCount: attributes.episodeCount,
      };

      formattedDataList.push(formattedData);
    } catch (error) {
      console.log(error);
    }
  }

  return formattedDataList;
}

*/
