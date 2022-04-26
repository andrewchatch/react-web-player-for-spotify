import axios from "axios";
import Icon from './Icon';
import React, { useState, useEffect } from "react";

const Albums = (props) => {
    const [albumArray, setAlbumArray] = useState([]);

    const token = props.token;
    const apiUrl = props.apiUrl;


    useEffect(() => {
        if(token) {
            axios.get(apiUrl + '/me/albums', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    'limit': 5
                }
            })
                .then((res) => {
                    setAlbumArray(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    return (
        <div id="albums">
            <h2 className='text-left title'>My Top Albums</h2>
            <div className="top-section">
            {
                albumArray && albumArray.map((album, index) => {
                    return <Icon key={index} passPlayingFromView={props.passPlayingFromView} item={album.album} token={token} type='albums' deviceID={props.deviceID} apiUrl={apiUrl} />
                })
            }
            </div>
            
        </div>
    )
}

export default Albums;