"use client";

import { useState } from 'react';

import { api } from '@/server/api';

interface FavoriteButtonProps {
  isFavorite: boolean;
  slug: string;
  email: string;
}

type method = "add" | "remove";

export function FavoriteButton({
  isFavorite,
  slug,
  email,
}: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState<boolean>(isFavorite);

  async function handleFavorite(method: method) {
    const { data } = await api.post("/favorite", {
      slug,
      email,
      type: method,
    });
    setIsFav(data.isFavorite);
  }

  if (isFav) {
    return (
      <button
        onClick={() => handleFavorite("remove")}
        className="rounded-lg border border-pink-500 bg-pink-400 p-2 text-secondary transition-all duration-500 hover:border-primary hover:bg-secondary hover:text-primary"
      >
        Remove from Favorites
      </button>
    );
  }

  return (
    <button
      onClick={() => handleFavorite("add")}
      className="rounded-lg border border-primary bg-secondary p-2 text-primary transition-all duration-500 hover:border-pink-500 hover:bg-pink-400 hover:text-secondary"
    >
      Add to Favorites
    </button>
  );
}
