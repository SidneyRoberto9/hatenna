"use client";

import React, { ReactNode, useState, useContext, createContext } from "react";
import { atRule } from "postcss";

import { api } from "@/server/api";
import { KitsuAnimeResponse } from "@/@Types/Kitsu";
import { CardAtributes } from "@/@Types/Card";

interface SearchContextProviderProps {
  children: ReactNode;
}

type SearchState = "loading" | "idle" | "error";

interface SearchContextType {
  searchState: SearchState;
  cardSearch: CardSearch;
  search: (value: string) => Promise<void>;
}

interface CardSearch {
  cards: CardAtributes[];
  lastSearchValue: string | null;
}

function formatSearchFromKitsu(data: Array<KitsuAnimeResponse>) {
  const formattedDataList: Array<CardAtributes> = [];

  console.log(data.length);

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

  console.log(formattedDataList);

  return formattedDataList;
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [contentSearch, setContentSearch] = useState<CardSearch>({
    cards: [],
    lastSearchValue: null,
  });

  async function search(value: string) {
    try {
      setSearchState("loading");
      const { data } = await api.get(
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
      value={{ searchState, cardSearch: contentSearch, search }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  return context;
}