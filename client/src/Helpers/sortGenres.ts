const sortGenres = (data: any) => {
    let genres: any = [];
    let genreCount: any = {};

    data.forEach((artist: any) => {
        let artistGenres = artist['genres'];

        artistGenres.forEach((genre: string) => {
            let capitalizedGenre: any = genre.split('-');

            capitalizedGenre.forEach((wordToCapitalize: string, index: number) => {
                wordToCapitalize = wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
                capitalizedGenre[index] = wordToCapitalize;
            })
            capitalizedGenre = capitalizedGenre.join('-');

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