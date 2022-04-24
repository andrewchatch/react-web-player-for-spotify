import axios from "axios";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import '../../../css/Icon.css';
import noImage from '../../../images/no-image.png';

const apiUrl = 'https://api.spotify.com/v1';

const Icon = (props) => {
    const { deviceID, item, token, type, apiUrl } = props;


    const showPlayButton = (event) => {
        document.getElementById(item.name + '-play').style.visibility = 'visible';
    }

    const hidePlayButton = (event) => {
        document.getElementById(item.name + '-play').style.visibility = 'hidden';
    }

    const playItem = async () => {
        const context_uri = item.uri;

        await axios.put(apiUrl + '/me/player/play', { context_uri: context_uri}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                device_id: deviceID
            }
        }) 
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }


    return props.item && (
        <div className="icons" onMouseEnter={showPlayButton} onMouseLeave={hidePlayButton}>
            <Link to='/auth/list' state={{ deviceID: deviceID, token: token, type: type, item: item, apiUrl: apiUrl }}>
                {item.images[0] ? <img className="item-img" alt="Item cover image" src={item.images[0].url} /> : <img src={noImage} alt='Item cover image' className='item-img' />}
            </Link>
            <p>{item.name}</p>

            <button id={item.name + '-play'} className="play-button btn" onClick={playItem}>Play</button>
        </div>
    )
}

export default Icon;