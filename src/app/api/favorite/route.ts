import { prisma } from "@/server/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const favorite = await prisma.favoriteAnimes.findFirst({
    where: {
      animeSlug: data.slug,
      userEmail: data.email,
    },
  });

  if (data.type === "add") {
    if (favorite) {
      return new Response(JSON.stringify({ isFavorite: true }), {
        headers: { "content-type": "application/json" },
      });
    } else {
      await prisma.favoriteAnimes.create({
        data: {
          animeSlug: data.slug,
          userEmail: data.email,
        },
      });
      return new Response(JSON.stringify({ isFavorite: true }), {
        headers: { "content-type": "application/json" },
      });
    }
  } else if (data.type === "remove") {
    if (favorite) {
      await prisma.favoriteAnimes.delete({
        where: {
          id: favorite.id,
        },
      });
    }
    return new Response(JSON.stringify({ isFavorite: false }), {
      headers: { "content-type": "application/json" },
    });
  }
}
