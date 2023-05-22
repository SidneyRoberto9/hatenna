"use client";

import React, { ReactNode, useState, useContext, createContext } from 'react';
import { atRule } from 'postcss';

import { kitsuApi } from '@/server/api';
import { KitsuAnimeResponse } from '@/@Types/Kitsu';
import { CardAtributes } from '@/@Types/Card';

interface SearchContextProviderProps {
  children: ReactNode;
}

type SearchState = "loading" | "idle" | "error";

type LayoutCartType = "grid" | "stretch";

interface SearchContextType {
  cardSearch: CardSearch;
  searchState: SearchState;
  layoutCardType: LayoutCartType;
  search: (value: string) => Promise<void>;
  changeLayoutType: (layout: LayoutCartType) => void;
}

interface CardSearch {
  cards: CardAtributes[];
  lastSearchValue: string | null;
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
        image: attributes.posterImage.original ?? "",
        post_image: attributes.coverImage.original ?? "",
        episodeCount: attributes.episodeCount,
      };

      formattedDataList.push(formattedData);
    } catch (error) {
      console.log(error);
    }
  }

  return formattedDataList;
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [layoutType, setLayoutType] = useState<"grid" | "stretch">("grid");
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [contentSearch, setContentSearch] = useState<CardSearch>({
    cards: [],
    lastSearchValue: null,
  });

  function changeLayoutType(layout: LayoutCartType) {
    setLayoutType(layout);
  }

  async function search(value: string) {
    try {
      if (value === "" || value === null) {
        return;
      }

      setSearchState("loading");
      const { data } = await kitsuApi.get(
        `anime?filter[text]=${value}&page[limit]=20&filter[subtype]=TV,ONA`
      );

      const formattedData: CardSearch = {
        cards: formatSearchFromKitsu(data.data),
        lastSearchValue: value,
      };

      setContentSearch(formattedData);

      setSearchState("idle");
    } catch (error) {
      setSearchState("error");
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchState,
        cardSearch: contentSearch,
        search,
        layoutCardType: layoutType,
        changeLayoutType,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  return context;
}
