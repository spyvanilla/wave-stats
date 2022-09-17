import React from 'react';
import {useState,useEffect} from 'react';

import Loading from './Loading';
import CurrentTrack from './CurrentTrack';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';

function ProfileIntro() {
    const [profile,setProfile] = useState<any>(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get-main-info')
        .then(response => response.json())
        .then(data => {
            setProfile(data.profile);
            setLoading(false);
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <section className="profile-intro">
                <img src={profile.images[0].url} alt={profile.display_name}></img>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} followers</p>
                <a href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer"><i><FontAwesomeIcon icon={faSpotify} /></i> See the profile on spotify</a>
                <CurrentTrack />
            </section>
        )}
        </>
    )
}

export default ProfileIntro;