'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/styles/Button';
import { api } from '@/server/api';
import { SmallSpinner } from '@/components/SmallSpinner';

interface FavoriteButtonProps {
  isFavorite: boolean;
  slug: string;
  email: string;
}

export function FavoriteButton({ isFavorite: initialState, slug, email }: FavoriteButtonProps) {
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['isFavorite', slug],
    queryFn: () => isFavoriteFetch(slug, email),
    enabled: false,
    cacheTime: 0,
    initialData: initialState,
  });

  const buttonText = data ? 'Remove from Favorites' : 'Add to Favorites';

  async function handleFavorite() {
    await refetch();
  }

  return (
    <Button isFavorite={data} onClick={handleFavorite}>
      {isFetching ? <SmallSpinner /> : buttonText}
    </Button>
  );
}

async function isFavoriteFetch(slug: string, email: string): Promise<boolean> {
  const { data } = await api.post('/favorite', {
    slug,
    email,
  });

  return data.isFavorite;
}
