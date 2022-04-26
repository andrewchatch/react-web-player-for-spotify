import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import PlaybackConsole from './playback/PlaybackConsole';
import ViewItem from './icons/ViewItem';
import Search from './search/Search';

const url = 'http://localhost:8000';
const apiUrl = 'https://api.spotify.com/v1';

const AuthApp = () => {
  document.addEventListener('readystatechange', () => {
    document.getElementsByTagName('body')[0].style.display = 'block';
  });

  document.addEventListener('logout', () => {
      setToken('');
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deviceID, setDeviceID] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [playingFromView, setPlayingFromView] = useState('');

  useEffect(() => {
    const getToken = async () => {
        await axios.get(url + '/auth/token', {withCredentials: true})
            .then((res) => {
                setIsAuthenticated(true);
                setToken(res.data.access_token);
                setRefreshToken(res.data.refresh_token);
            })
            .catch((err) => {
                console.log(err);
                setIsAuthenticated(false);
                window.location.href = '/';
            });

    }

    getToken();


}, [token]);


    return (
      <div className="Auth-App">
          {isAuthenticated &&
            <div>
                <Navbar />
                <PlaybackConsole url={url} token={token} refreshToken={refreshToken} apiUrl={apiUrl} playingFromView={playingFromView} passDeviceID={setDeviceID} />
                
                <Routes>
                    <Route path='/' exact element={<Home url={url} token={token} refreshToken={refreshToken} apiUrl={apiUrl} deviceID={deviceID} passPlayingFromView={setPlayingFromView} />} />
                    <Route path='/list' exact element={<ViewItem passPlayingFromView={setPlayingFromView} />} />
                    <Route path='/search' exact element={<Search apiUrl={apiUrl} token={token} deviceID={deviceID} />} />
                </Routes>
            </div>
          }
            
      </div>
    );
  
}

export default AuthApp;
