import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';
import '../../../css/Icon.css';
import { player } from '../playback/ScriptCode';
import noImage from '../../../images/no-image.png';

// const apiUrl = 'https://api.spotify.com/v1';

const Icon = (props) => {
    const { item, token, type, apiUrl, passPlayingFromView } = props;


    const showPlayButton = () => {
        document.getElementById(item.name + '-play').style.visibility = 'visible';
    }

    const hidePlayButton = () => {
        document.getElementById(item.name + '-play').style.visibility = 'hidden';
    }

    const playItem = async () => {
        const context_uri = item.uri;

        await transferPlayback();
        await getPlaybackState();

        await axios.put(apiUrl + '/me/player/play', { context_uri: context_uri}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                device_id: player.device_id
            }
        }) 
            .then((res) => {
                console.log(res);
                passPlayingFromView(true);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const getPlaybackState = async () => {
        await axios.get(apiUrl + '/me/player', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const transferPlayback = async () => {
        await axios.put(apiUrl + '/me/player', { device_ids: [player.device_id], play: true}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    // useEffect(() => {
    //     const func = async () => {
    //         if(token) {
    //             await axios.get(apiUrl + '/me/player', {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token,
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //                 .then((res) => {
    //                     console.log(res.data.is_playing);
    //                     passPlayingFromView(res.data.is_playing);
    //                 })
    //                 .catch((err) => {
    //                     console.log(err.response);
    //                 });
    //         }
    //     }

    //     func();
        
    // }, [token]);


    return props.item && (
        <div className="icons" onMouseEnter={showPlayButton} onMouseLeave={hidePlayButton}>
            <Link to='/auth/list' state={{ deviceID: player.device_id, token: token, type: type, item: item, apiUrl: apiUrl }}>
                {item.images[0] ? <img className="item-img" alt="Item cover image" src={item.images[0].url} /> : <img src={noImage} alt='Item cover image' className='item-img' />}
            </Link>
            <p>{item.name}</p>

            <button id={item.name + '-play'} className="play-button btn" onClick={playItem}>Play</button>
        </div>
    )
}

export default Icon;