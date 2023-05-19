import { SearchButton } from "@/components/SearchButton";
import { CardList } from "@/components/Card/List";

export default function Home() {
  return (
    <main className="mt-52 flex h-full w-full justify-center">
      <section className="flex flex-col items-center gap-5">
        <SearchButton />
        <CardList />
      </section>
    </main>
  );
}
