import { prisma } from '@/server/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  const animeFavorite = await prisma.favoriteAnimes.findFirst({
    where: {
      animeSlug: data.slug,
      userEmail: data.email,
    },
  });

  if (animeFavorite) {
    await prisma.favoriteAnimes.delete({
      where: {
        id: animeFavorite.id,
      },
    });

    return new Response(JSON.stringify({ isFavorite: false }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  await prisma.favoriteAnimes.create({
    data: {
      animeSlug: data.slug,
      userEmail: data.email,
    },
  });

  return new Response(JSON.stringify({ isFavorite: true }), {
    headers: { 'content-type': 'application/json' },
  });
}
