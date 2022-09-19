const sortGenres = (data: any) => {
    let genres: any = {};

    data.forEach((artist: any) => {
        let artistGenres = artist['genres'];

        artistGenres.forEach((genre: string) => {
            let capitalizedGenre: any = genre.split(' ');

            capitalizedGenre.forEach((wordToCapitalize: string, index: number) => {
                wordToCapitalize = wordToCapitalize.charAt(0).toUpperCase() + wordToCapitalize.slice(1);
                capitalizedGenre[index] = wordToCapitalize;
            })
            capitalizedGenre = capitalizedGenre.join(' ');

            if (capitalizedGenre in genres) {
                genres[capitalizedGenre] = genres[capitalizedGenre]+1;
            }
            else {
                genres[capitalizedGenre] = 1;
            }
        })
    })

    console.log(genres);
}

export default sortGenres;