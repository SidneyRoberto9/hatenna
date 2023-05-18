"use client";
import { useSearch } from "@/context/search.context";
import { SearchButton } from "@/components/SearchButton";
import { Card } from "@/components/Card/Card";

export default function Home() {
  const { cardSearch } = useSearch();

  return (
    <main className="mt-52 flex h-full w-full justify-center">
      <section className="flex flex-col items-center gap-20">
        <SearchButton />

        {cardSearch.cards.length > 0 &&
          cardSearch.cards.map((card) => (
            <Card key={card.slug} attributes={card} type="small" />
          ))}
      </section>
    </main>
  );
}
