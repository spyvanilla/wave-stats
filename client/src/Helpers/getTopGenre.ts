const keyGenreWords = ['rock','pop','blues','bossanova','emo','jazz','alternative','country','classical']

const getTopGenre = (data: any) => {
    let genres: any = {};
    let topGenre: any = null;
    let generic = false;

    data.forEach((artist: any) => {
        let artistGenres = artist['genres'];

        artistGenres.forEach((genre: string) => {
            if (genre in genres) {
                genres[genre] = genres[genre]+1;
            }
            else {
                genres[genre] = 1;
            }
        });
    });

    let sortedGenres = [];

    for (var genre in genres) {
        sortedGenres.push([genre, genres[genre]]);
    }

    sortedGenres.sort((a: any, b: any) => {
        return b[1] - a[1];
    })

    sortedGenres.forEach((genre: any) => {
        if (topGenre !== null) {
            return;
        }

        keyGenreWords.forEach((keyGenre: string) => {
            if (keyGenre.includes(genre[0])) {
                topGenre = keyGenre;
                return;
            }
        })
    })

    if (topGenre === null) {
        let firstGenre = sortedGenres[0][0].replace('-',' ').split(' ');

        firstGenre.forEach((wordToCapitalize: string, index: number) => {
            wordToCapitalize = wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
            firstGenre[index] = wordToCapitalize;
        })
        firstGenre = firstGenre.join(' ');

        if (firstGenre in genres) {
            genres[firstGenre] = genres[firstGenre]+1;
        }
        else {
            genres[firstGenre] = 1;
        }

        topGenre = firstGenre.join(' ');
    }

    return [topGenre,generic];
}

export default getTopGenre;