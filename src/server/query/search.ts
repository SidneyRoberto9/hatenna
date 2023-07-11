export function aniListSearch(text: string) {
  const query: string = `
    query ($search: String) {
        Page(page: 0, perPage: 20) {
            pageInfo {
                total
                perPage
            }
            media(search: $search, type: ANIME, sort: TRENDING_DESC, format_in: [TV, TV_SHORT, OVA, MOVIE,ONA], isAdult: false) {
                id
                episodes
                bannerImage
                status
                seasonYear
                format
                title {
                    romaji
                }
                coverImage {
                    large
                    color
                }
                endDate {
                    year
                    month
                    day
                }
                startDate {
                    year
                    month
                    day
                }
                description
            }
        }
    }
`;

  const variables: string = `
    {
        "search": "${text}"
    }
    `;

  return {
    query: query,
    variables: variables,
  };
}
