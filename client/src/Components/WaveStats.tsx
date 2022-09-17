import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading';

function WaveStats() {
  const [genre,setGenre] = useState<any>(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-top-genre')
    .then(response => response.json())
    .then(data => {
      setGenre(data.genre);
      setLoading(false);
    })
  },[])

  return (
    <>
    {loading === true ? <Loading type={2} /> : (
      <section className="wave-stats">
        <h2 className="wave-stats-title">Your Wave Stats</h2>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" /></defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="#891A12" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="#B34131" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="#DE6651" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#FF8C74" />
          </g>
        </svg>
        <h2 className="wave-definition">Your wave today is: <span style={{color: "#14195e"}}>Rock</span></h2>
      </section>
    )}
    </>
  )
}

export default WaveStats;