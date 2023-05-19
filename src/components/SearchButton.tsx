"use client";

import { KeyboardEvent, useRef } from "react";
import { StretchHorizontal, Search, LayoutGrid } from "lucide-react";

import { useSearch } from "@/context/search.context";

export function SearchButton() {
  const { search, cardSearch, changeLayoutType } = useSearch();

  const searchValueRef = useRef<HTMLInputElement>(null);
  const isIdle = cardSearch.lastSearchValue != null;

  function handleSearch() {
    search(searchValueRef.current?.value as string);
    searchValueRef.current!.value = "";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      search(searchValueRef.current?.value as string);
      searchValueRef.current!.value = "";
    }
  }

  return (
    <div className="relative h-16 w-96">
      <label htmlFor="search" className="my-1 text-sm">
        Try out Search for your Favorite Anime
      </label>
      <input
        className="relative h-12 w-full rounded-md border-2 border-primary-button p-2"
        id="search"
        type="text"
        placeholder="Search for an anime, e.g Naruto"
        spellCheck={false}
        onKeyDown={handleKeyDown}
        ref={searchValueRef}
      />
      <Search
        className="absolute right-2 top-9 cursor-pointer text-primary-button"
        size={24}
        onClick={handleSearch}
      />

      {isIdle && (
        <div className="flex items-center justify-between">
          <span className="flex text-sm ">
            <p> Last Search:</p>

            <h5 className="ml-2 text-primary-button">
              {cardSearch.lastSearchValue}
            </h5>
          </span>
          <div className="mt-1 flex gap-2">
            <LayoutGrid
              size={20}
              className="cursor-pointer text-primary-button"
              onClick={() => changeLayoutType("grid")}
            />
            <StretchHorizontal
              size={20}
              className="cursor-pointer text-primary-button"
              onClick={() => changeLayoutType("stretch")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
