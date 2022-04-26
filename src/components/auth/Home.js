import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlists from './icons/Playlists';
import Artists from './icons/Artists';
import Albums from './icons/Albums';
import '../../css/Home.css';
import UserSection from './UserSection';


const Home = (props) => {
    const token = props.token;
    const apiUrl = props.apiUrl;
    const deviceID = props.deviceID;
    const [profile, setProfile] = useState('');
    const url = props.url;


    useEffect(() => {
        if(token) {
            getProfile(token);
        }
        else {
            window.location.redirect = '/';
        }
    }, [token]);

    const getProfile = async (token) => {
        await axios.get(apiUrl + '/me', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        profile && <div id="home" className='text-center'>

            <UserSection profile={profile} url={url} />

            <div id="top-section">
                <Playlists apiUrl={apiUrl} token={token} deviceID={deviceID} passPlayingFromView={props.passPlayingFromView} />
                <Artists apiUrl={apiUrl} token={token} deviceID={deviceID} passPlayingFromView={props.passPlayingFromView} />
                <Albums apiUrl={apiUrl} token={token} deviceID={deviceID} passPlayingFromView={props.passPlayingFromView} />
            </div>
            
        </div>
    )
}

export default Home;