'use client';

import { useSearch } from '@/context/search.context';
import { SmallCard } from '@/components/Card/Small';
import { MediumCard } from '@/components/Card/Medium';
import { LargeCard } from '@/components/Card/large';

export function CardList() {
  const { cardSearch, layoutCardType } = useSearch();

  const hasSearch: boolean = cardSearch.cards.length > 0;

  const gridClass: string =
    'my-8 grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';

  const stretchClass: string = 'my-8 flex flex-col gap-6';

  const aroundClass: string = 'my-10 grid w-full gap-10 md:grid-cols-1 lg:grid-cols-2';

  return (
    <div className="w-full max-w-7xl">
      {hasSearch && (
        <div
          className={
            layoutCardType === 'grid'
              ? gridClass
              : layoutCardType === 'stretch'
              ? stretchClass
              : aroundClass
          }>
          {layoutCardType === 'grid' &&
            cardSearch.cards.map((card) => <SmallCard key={card.id} attributes={card} />)}

          {layoutCardType === 'stretch' &&
            cardSearch.cards.map((card) => <LargeCard key={card.id} attributes={card} />)}

          {layoutCardType === 'around' &&
            cardSearch.cards.map((card) => <MediumCard key={card.id} attributes={card} />)}
        </div>
      )}
    </div>
  );
}
