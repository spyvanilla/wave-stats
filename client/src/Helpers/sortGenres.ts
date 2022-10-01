const sortGenres = (data: any) => {
    // Data contains a json object from spotify api with the user's top artists
    let genres: any = [];
    let genreCount: any = {};
    // genreCount is responsible for counting the genres
    // before adding then to the genres array

    data.forEach((artist: any) => {
        let artistGenres = artist['genres']; // Each artist has an array of musical genres

        artistGenres.forEach((genre: string) => {
            let capitalizedGenre: any = genre.split('-');

            capitalizedGenre.forEach((wordToCapitalize: string, index: number) => {
                wordToCapitalize = wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
                capitalizedGenre[index] = wordToCapitalize;
            })
            capitalizedGenre = capitalizedGenre.join('-');
            // This part is responsible for formatting the genre strings
            // before adding then to the genreCount object

            if (capitalizedGenre in genreCount) {
                genreCount[capitalizedGenre] = genreCount[capitalizedGenre]+1;
            }
            else {
                genreCount[capitalizedGenre] = 1;
            }
        })
    })

    for (const genreKey in genreCount) {
        genres.push({genre: genreKey, quantity: genreCount[genreKey]});
    }

    genres.sort((a: any, b: any) => {
        return b[1] - a[1];
    })

    return genres;
}

export default sortGenres;