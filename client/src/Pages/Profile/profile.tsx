import React from 'react';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import ProfileIntro from '../../Components/ProfileIntro';
import CurrentTrack from '../../Components/CurrentTrack';
import WaveStats from '../../Components/WaveStats';
import GenreIndices from '../../Components/GenreIndices';
import TopItems from '../../Components/TopItems';

import './profile.css';

function Profile({isAuthenticated, setIsAuthenticated} : {isAuthenticated: null | boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>}) {
    const [permissionError,setPermissionError] = useState<null | boolean>(null);
    // Checks if the user took off app's permission to access their spotify data
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || permissionError) {
            setIsAuthenticated(false);
            return navigate('/');
        }
    },[permissionError,isAuthenticated,setIsAuthenticated,navigate])

    return (
        <>
        <ProfileIntro setPermissionError={setPermissionError} />
        {permissionError === true || permissionError === null ? '' : (
            <>
            <CurrentTrack />
            <WaveStats />
            <GenreIndices />
            <TopItems />
            </>
        )}
        </>
    )
}

export default Profile;