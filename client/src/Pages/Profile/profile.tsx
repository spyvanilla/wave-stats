import React from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import ProfileIntro from '../../Components/ProfileIntro';

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
        </>
    )
}

export default Profile;