import React from 'react';
import {useState,useEffect} from 'react';
import {isMobile} from 'react-device-detect';

import Loading from './Loading';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';

import noProfile from '../Assets/Images/no-profile.png';

function ProfileIntro() {
    const [profile,setProfile] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const [withImage,setWithImage] = useState(true); // checks if the user has a profile picture

    const eraseProfile = () => {
        fetch('/api/erase-profile')
        .then(() => window.location.replace('/'))
    }

    useEffect(() => {
        fetch('/api/get-main-info')
        .then(response => response.json())
        .then(data => {
            setProfile(data.profile);
            setLoading(false);

            if (data.profile.images.length === 0) {
                setWithImage(false);
            }
        })
    },[])

    return (
        <>
        {loading === true ? <Loading type={2} /> : (
            <section className="profile-intro">
                <img src={withImage === true ? profile.images[0].url : noProfile} alt={profile.display_name} className={isMobile === true ? "mobile-appear" : "desktop-appear"}></img>
                <h1 className={isMobile === true ? "mobile-appear" : "desktop-appear"}>{profile.display_name}</h1>
                <p className={isMobile === true ? "mobile-appear" : "desktop-appear"}>{profile.followers.total} followers</p>
                <a href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer" className={isMobile === true ? "mobile-appear" : "desktop-appear"}><i><FontAwesomeIcon icon={faSpotify} /></i> See the profile on spotify</a>
                <button onClick={eraseProfile} className={isMobile === true ? "mobile-appear" : "desktop-appear"}>Erase profile</button>
            </section>
        )}
        </>
    )
}

export default ProfileIntro;