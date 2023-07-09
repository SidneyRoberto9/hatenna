import { getServerSession } from 'next-auth';

import { authOptions } from '@/server/auth';
import { SearchButton } from '@/components/SearchButton';
import { Header } from '@/components/Header/Header';
import { CardList } from '@/components/Card/List';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full">
      <Header session={session} />
      <main className="mt-44 flex h-full w-full justify-center">
        <section className="flex flex-col items-center gap-5">
          <SearchButton />
          <CardList />
        </section>
      </main>
    </div>
  );
}

