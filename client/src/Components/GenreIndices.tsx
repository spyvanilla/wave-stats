import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading'
import sortGenres from '../Helpers/sortGenres';

import {RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Tooltip,Legend} from 'recharts';

const data = [
    {
        "subject": "Math",
        "A": 120,
        "fullMark": 150
    },
    {
        "subject": "Chinese",
        "A": 98,
        "fullMark": 150
    },
    {
        "subject": "English",
        "A": 86,
        "fullMark": 150
    },
    {
        "subject": "Geography",
        "A": 99,
        "fullMark": 150
    },
    {
        "subject": "Physics",
        "A": 85,
        "fullMark": 150
    },
    {
        "subject": "History",
        "A": 65,
        "fullMark": 150
    }
]

function GenreIndices() {
    const [genres,setGenres] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-genres')
        .then(response => response.json())
        .then(data => {
            sortGenres(data.data);
            setLoading(false);
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <section className="genre-indices">
                <RadarChart outerRadius="90%" width={730} height={600} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{fill: "#fff"}} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Legend />
                </RadarChart>
            </section>
        )}
        </>
    )
}

export default GenreIndices;