'use client';
import { w } from 'windstitch';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/server/api';
import { SmallSpinner } from '@/components/SmallSpinner';

const Button = w.button(
  'flex items-center justify-center rounded-lg border p-2 transition-all duration-500',
  {
    variants: {
      state: (yes: boolean) =>
        yes
          ? 'border-pink-500 bg-pink-400 text-secondary hover:border-primary hover:bg-secondary hover:text-primary'
          : 'border-primary bg-secondary text-primary hover:border-pink-500 hover:bg-pink-400  hover:text-secondary',
    },
  },
);

const isFavoriteFetch = async (slug: string, email: string): Promise<boolean> => {
  const { data } = await api.post('/favorite', {
    slug,
    email,
  });

  return data.isFavorite;
};

interface FavoriteButtonProps {
  isFavorite: boolean;
  slug: string;
  email: string;
}

export function FavoriteButton({ isFavorite: initialState, slug, email }: FavoriteButtonProps) {
  const {
    data: isFavorite,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['isFavorite', slug],
    queryFn: () => isFavoriteFetch(slug, email),
    enabled: false,
    cacheTime: 0,
    initialData: initialState,
  });

  const buttonText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  async function handleFavorite() {
    await refetch();
  }

  return (
    <Button state={isFavorite} onClick={handleFavorite}>
      {isFetching ? <SmallSpinner /> : buttonText}
    </Button>
  );
}
