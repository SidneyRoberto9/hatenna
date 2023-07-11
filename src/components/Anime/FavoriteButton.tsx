'use client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/styles/Button';
import { api } from '@/server/api';
import { SmallSpinner } from '@/components/SmallSpinner';

interface FavoriteButtonProps {
  isFavorite: boolean;
  slug: string;
  email: string;
}

export function FavoriteButton({ isFavorite: initialState, slug, email }: FavoriteButtonProps) {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: () => isFavoriteFetch(slug, email),
  });

  const value: boolean = data == undefined ? initialState : data;

  const buttonText = value ? 'Remove from Favorites' : 'Add to Favorites';

  async function handleFavorite() {
    await mutateAsync();
  }

  return (
    <Button favorite={value ? 'true' : 'false'} onClick={handleFavorite}>
      {isLoading ? <SmallSpinner /> : buttonText}
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
