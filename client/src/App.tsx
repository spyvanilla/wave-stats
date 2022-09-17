import React from 'react';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Home,Profile} from './Pages';
import Loading from './Components/Loading';

import './Assets/App.css';

function App() {
  const [loading,setLoading] = useState(true);
  const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
      fetch('/api/is-authenticated')
      .then(response => response.json())
      .then(data => {
          setIsAuthenticated(data.authenticated);
          setLoading(false);
      })
  },[])

  return (
    <>
    {loading === true ? <Loading type={1} /> : (
      <Router>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />}></Route>
          <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} />}></Route>
        </Routes>
      </Router>
    )}
    </>
  );
}

export default App;
