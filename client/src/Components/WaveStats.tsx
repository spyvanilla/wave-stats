import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading';
import getTopGenre from '../Helpers/getTopGenre';

function WaveStats() {
  const [genre,setGenre] = useState<any>(null);
  const [generic,setGeneric] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-genres')
    .then(response => response.json())
    .then(data => {
      const [topGenre,isGeneric] = getTopGenre(data.data);
      setGenre(topGenre);
      setGeneric(isGeneric);
      setLoading(false);
    })
  },[])

  return (
    <>
    {loading === true ? <Loading type={2} /> : (
      <section className="wave-stats">
        <section style={{position: 'relative'}}>
          <h2 className="wave-stats-title">Your Wave Stats</h2>
        </section>
        <div className={`genre-wave wave-${generic === true ? 'generic' : genre} wave-hidden`}></div>
        <h2 className="wave-definition">Your wave today is: {genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
      </section>
    )}
    </>
  )
}

export default WaveStats;