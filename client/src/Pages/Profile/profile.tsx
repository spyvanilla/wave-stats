import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import ProfileIntro from '../../Components/ProfileIntro';
import CurrentTrack from '../../Components/CurrentTrack';
import WaveStats from '../../Components/WaveStats';
import GenreIndices from '../../Components/GenreIndices';
import TopItems from '../../Components/TopItems';

import './profile.css';

function Profile({isAuthenticated} : {isAuthenticated: null | boolean}) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/');
        }
    },[isAuthenticated,navigate])

    return (
        <>
        <ProfileIntro />
        <CurrentTrack />
        <WaveStats />
        <GenreIndices />
        <TopItems />
        </>
    )
}

export default Profile;