import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading'
import sortGenres from '../Helpers/sortGenres';

import {ResponsiveContainer,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Tooltip} from 'recharts';

function GenreIndices() {
    const [genres,setGenres] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-genres')
        .then(response => response.json())
        .then(data => {
            const genreData = sortGenres(data.data);
            setGenres(genreData);
            setLoading(false);
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <section className="genre-indices">
                <h2 className="genre-indices-title">Genres you heard the most</h2>
                <ResponsiveContainer width="100%" aspect={2}>
                    <RadarChart data={genres.slice(0,6)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="genre" tick={{fill: "#fff"}} />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Radar name="Wave Indice" dataKey="quantity" stroke="#1ED760" fill="#1ED760" fillOpacity={0.6} />
                        <Tooltip contentStyle={{backgroundColor: "#303030"}} />
                    </RadarChart>
                </ResponsiveContainer>
            </section>
        )}
        </>
    )
}

export default GenreIndices;