export function getOne(id: string | number) {
  const query: string = `
  query ($id: Int) {
	Media(id: $id) {
		id
		title {
			romaji
			english
			native
		}
		coverImage {
			large
			color
		}
		bannerImage
		episodes
		duration
		averageScore
		rankings {
			allTime
			type
			context
			rank
		}
		popularity
		favourites
		episodes
		description
		status
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
		season
		seasonYear
		studios {
			edges {
				isMain
			}
			nodes {
				name
			}
		}
		genres
		source
		tags {
			name
		  }
	}
}`;

  const variables: string = `
      {
          "id": "${id}"
      }
      `;

  return {
    query: query,
    variables: variables,
  };
}
