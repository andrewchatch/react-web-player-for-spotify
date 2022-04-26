import axios from "axios";
import React, { useState, useEffect } from "react";
import Icon from "./Icon";

const Artists = (props) => {
    const [artistArray, setArtistArray] = useState([]);
    const token = props.token;
    const apiUrl = props.apiUrl;

    useEffect(() => {
        if(token) {
            axios.get(apiUrl + '/me/top/artists', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    "limit": 5
                }
            })
                .then((res) => {
                    setArtistArray(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        
    }, [token])  

    return (
        <div id="artists">
            <h2 className='text-left title'>My Top Artists</h2>
            <div className="top-section">
            {
                artistArray && artistArray.map((artist) => {
                    return <Icon key={artist.id} passPlayingFromView={props.passPlayingFromView} item={artist} token={token} type='artists' deviceID={props.deviceID} apiUrl={apiUrl} />
                })
            }
            </div>
        </div>
    )
}

export default Artists;