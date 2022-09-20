import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading';

function FavoriteItems() {
    const [topArtists,setTopArtists] = useState<any>(null);
    const [topTracks,setTopTracks] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-top-items')
        .then(response => response.json())
        .then(data => {
            setTopArtists(data.artists);
            setTopTracks(data.tracks);
            setLoading(false);
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <section className="favorite-items">
                <h2 className="wave-stats-title">Your Top Artists</h2>
                <div className="display-items">
                {topArtists.slice(0,5).map((artist: any, index: number) => {
                    return (
                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={index}>
                            <img src={artist.images[1].url} alt={artist.name} className="top-artist-big-image"></img>
                        </a>
                    )
                })}
                </div>
                <h2 className="wave-stats-title">Your Top Tracks</h2>
                <div className="display-items">
                {topTracks.slice(0,5).map((track: any, index: number) => {
                    return (
                        <a href={track.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" key={index}>
                            <img src={track.track.album.images[1].url} alt={track.name} className="top-track-big-image"></img>
                        </a>
                    )
                })}
                </div>
            </section>
        )}
        </>
    )
}

export default FavoriteItems;