import React from 'react';
import {useState,useEffect} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';

import Loading from '../../Components/Loading';

import './home.css';

function Home({isAuthenticated} : {isAuthenticated: null | boolean}) {
    const [loading,setLoading] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/profile')
        }
        else {
            const code = searchParams.get('code');

            if (code) {
                setLoading(true);
                searchParams.delete('code');
                setSearchParams(searchParams);

                fetch('/api/save-code', {
                    method: 'POST',
                    body: JSON.stringify({code: code})
                })
                .then(response => response.json())
                .then(token => {
                    console.log(token)
                    setLoading(false);
                })
            }
        }
    },[isAuthenticated,searchParams,setSearchParams,navigate])

    const handleClick = () => {
        window.location.replace('/api/authorize')
    }

    return (
        <>
        {loading === true ? <Loading type={1} /> : (
            <div className="home-background">
                <h1>Welcome to <span>Wave Stats</span></h1>
                <h2>Analyse your wave status in spotify!</h2>
                <button onClick={handleClick}>Get Started</button>
            </div>
        )}
        </>
    )
}

export default Home;