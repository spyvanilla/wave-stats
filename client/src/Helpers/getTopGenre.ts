const keyGenreWords = ['rock','pop','blues','bossa-nova','emo','jazz','alternative','country','classical','rap','romantic','mpb'];
// keyGenreWords is an array of default genres that generate custom waves found in the assets folder,
// if the user doesn't have any of these in their genres, a generic wave will be displayed

const getTopGenre = (data: any) => {
    // Data contains a json object from spotify api with the user's top artists
    let genres: any = {};
    let topGenre: any = null;
    let generic = false; // If generic is true, it's going to display the generic waves and show the user's top genre

    data.forEach((artist: any) => {
        let artistGenres = artist['genres']; // Each artist has an array of musical genres

        artistGenres.forEach((genre: string) => {
            // This is responsible for adding every genre in every artist
            // as well as the quantity of times each genre appears to the genres object
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
            if (genre[0].replace(' ','-').includes(keyGenre)) {
                topGenre = keyGenre;
                return;
            }
        })
    })

    if (topGenre === null) {
        // User's genres did not include one of the key genres
        let firstGenre = sortedGenres[0][0].replace('-',' ').split(' ');

        firstGenre.forEach((wordToCapitalize: string, index: number) => {
            wordToCapitalize = wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
            firstGenre[index] = wordToCapitalize;
        })

        if (firstGenre.length === 1) {
            firstGenre = firstGenre[0];
        }
        else {
            firstGenre = firstGenre.join(' ');
        }
        // This part is responsible for formatting the top genre string
        // to display it in the WaveStats component

        generic = true;
        topGenre = firstGenre;
    }

    return [topGenre,generic];
}

export default getTopGenre;