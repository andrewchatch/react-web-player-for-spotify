import axios from "axios";
import Icon from './Icon';
import React, { useState, useEffect } from "react";

const Playlists = (props) => {
    const [playlistArray, setPlaylistArray] = useState([]);

    const token = props.token;
    const apiUrl = props.apiUrl;


    useEffect(() => {
        if(token) {
            axios.get(apiUrl + '/me/playlists', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    'limit': 5
                }
            })
                .then((res) => {
                    setPlaylistArray(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    return (
        <div id="playlists">
            <h2 className='text-left title'>My Top Playlists</h2>
            <div className="top-section">
            {
                playlistArray && playlistArray.map((playlist, index) => {
                    return <Icon key={playlist.id} item={playlist} token={token} type='playlists' deviceID={props.deviceID} apiUrl={apiUrl} />
                })
            }
            </div>
            
        </div>
    )
}

export default Playlists;