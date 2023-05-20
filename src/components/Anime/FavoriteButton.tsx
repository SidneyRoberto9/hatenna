interface FavoriteButtonProps {
  isFavorite: boolean;
}

export function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  if (isFavorite) {
    return (
      <button className="rounded-lg border border-pink-500 bg-pink-400 p-2 text-secondary transition-all duration-500 hover:border-primary hover:bg-secondary hover:text-primary">
        Remove from Favorites
      </button>
    );
  }

  return (
    <button className="rounded-lg border border-primary bg-secondary p-2 text-primary transition-all duration-500 hover:border-pink-500 hover:bg-pink-400 hover:text-secondary">
      Add to Favorites
    </button>
  );
}
