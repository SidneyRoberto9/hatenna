import { SearchButton } from '@/components/SearchButton';
import { CardList } from '@/components/Card/List';

export default async function Home() {
  return (
    <div className="w-full">
      <main className="mt-72 flex h-full w-full justify-center">
        <section className="flex flex-col items-center gap-5">
          <SearchButton />
          <CardList />
        </section>
      </main>
    </div>
  );
}

