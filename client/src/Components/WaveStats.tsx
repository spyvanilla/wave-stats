import React from 'react';
import {useState,useEffect} from 'react';
import {useInView} from 'react-intersection-observer';

import Loading from './Loading';
import getTopGenre from '../Helpers/getTopGenre';

function WaveStats() {
  const [genre,setGenre] = useState<any>(null);
  const [generic,setGeneric] = useState(false);
  const [loading,setLoading] = useState(true);
  const {ref,inView} = useInView({threshold: 0});

  useEffect(() => {
    fetch('/api/get-genres')
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        const [topGenre,isGeneric] = getTopGenre(data.data);
        setGenre(topGenre);
        setGeneric(isGeneric);
      }
      setLoading(false);
    })
  },[])

  return (
    <>
    {loading === true ? <Loading type={2} /> : (
      <>
      {genre === null ? '' : (
        <section className={inView === true ? "wave-stats hidden shown" : "wave-stats hidden"} ref={ref}>
          <section style={{position: 'relative'}}>
            <h2 className="wave-stats-title">Your Wave Stats</h2>
          </section>
          <div className={`genre-wave wave-${generic === true ? 'generic' : genre} wave-hidden`}></div>
          <h2 className="wave-definition">Your wave is: {genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
        </section>
      )}
      </>
    )}
    </>
  )
}

export default WaveStats;