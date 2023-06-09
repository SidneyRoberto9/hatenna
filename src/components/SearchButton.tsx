'use client';
import { KeyboardEvent, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Search } from 'lucide-react';

import { useSearch } from '@/context/search.context';
import { Header } from '@/components/Header/Header';
import { ButtonsGrid } from '@/components/ButtonsGrid';

export function SearchButton() {
  const { search, cardSearch, changeLayoutType: onChangeLayoutCard } = useSearch();
  const { data: session } = useSession();

  const searchValueRef = useRef<HTMLInputElement>(null);
  const isIdle = cardSearch.lastSearchValue != null;

  async function handleSearch() {
    await search(searchValueRef.current?.value as string);
    searchValueRef.current!.value = '';
  }

  async function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      await search(searchValueRef.current?.value as string);
      searchValueRef.current!.value = '';
    }
  }

  const isSearchClass = isIdle && '-mt-72';

  return (
    <div className={`transition-all duration-500 ${isSearchClass}`}>
      {isIdle && <Header session={session} />}
      <div className="relative h-16 w-11/12 lg:w-256">
        <label htmlFor="search" className="my-1 text-sm">
          Try out Search for your Favorite Anime
        </label>
        <input
          className="relative h-12 w-full rounded-md border-2 border-primary-button bg-secondary-button p-2"
          id="search"
          type="text"
          placeholder="Search for an anime, e.g Naruto"
          spellCheck={false}
          onKeyDown={handleKeyDown}
          ref={searchValueRef}
        />
        <Search
          className="absolute right-2.5 top-9 cursor-pointer text-primary-button"
          size={24}
          onClick={handleSearch}
        />

        {isIdle && (
          <div className="flex items-center justify-between">
            <span className="flex text-sm ">
              <p> Last Search:</p>

              <h5 className="ml-2 text-primary-button">{cardSearch.lastSearchValue}</h5>
            </span>

            <ButtonsGrid changeLayoutType={onChangeLayoutCard} />
          </div>
        )}
      </div>
    </div>
  );
}
