'use client';
import { w } from 'windstitch';
import { useState } from 'react';

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

interface FavoriteButtonProps {
  isFavorite: boolean;
  slug: string;
  email: string;
}

export function FavoriteButton({ isFavorite: initialState, slug, email }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const buttonText = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  async function handleFavorite() {
    try {
      setIsLoading(true);
      const { data } = await api.post('/favorite', {
        slug,
        email,
        type: isFavorite ? 'remove' : 'add',
      });
      setIsFavorite(data.isFavorite);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button state={isFavorite} onClick={handleFavorite}>
      {isLoading ? <SmallSpinner /> : buttonText}
    </Button>
  );
}
