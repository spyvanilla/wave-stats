import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading'

function CurrentTrack() {
    const [currentTrack,setCurrentTrack] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-current-track')
        .then(response => response.json())
        .then(data => {
            setCurrentTrack(data.current_track);
            setLoading(false);
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <>
            {currentTrack === null ? '' : (
                <div className="current-track">
                    <h2>Listening to:</h2>
                    <a href={currentTrack.item.external_urls.spotify}>
                        <img src={currentTrack.item.album.images.url} alt={currentTrack.item.name}></img>
                    </a>
                    <h2>{currentTrack.item.name}</h2>
                    <h3>{currentTrack.item.artists[0].name}</h3>
                </div>
            )}
            </>
        )}
        </>
    )
}

export default CurrentTrack;