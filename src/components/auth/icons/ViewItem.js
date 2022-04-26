import React, { useEffect, useState } from "react";
import noImage from '../../../images/no-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../css/ViewItem.css';
import { useLocation } from "react-router-dom";
import { player } from '../playback/ScriptCode';
import axios from "axios";

const ViewItem = (props) => {

    const location = useLocation();

    const { token, type, item, apiUrl } = location.state || '';

    const typeVal = type.slice(0, -1)

    const [tracks, setTracks] = useState([]);

    const getTracks = async () => {

        if(type === 'artists') {
            await axios.get(apiUrl + `/${type}/${item.id}/top-tracks`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    market: 'US',
                    limit: 20
                }
            })
                .then((res) => {
                    setTracks(res.data.tracks);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            await axios.get(apiUrl + `/${type}/${item.id}/tracks`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                params: {
                    limit: 20
                }
            })
                .then((res) => {
                    setTracks(res.data.items);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        const func = async () => {
            await getTracks();
        }

        func();

    }, []);

    const getRowElement = (elem) => {

        if(elem.tagName != 'TR') {
            elem = elem.parentElement;
            return getRowElement(elem);
        }
        else {
            return elem;
        }
    }

    const showPlayButton = (event) => {
        const num = event.target.parentElement.id[0];

        const rowNum = document.getElementById(num + 'num');
        const playButton = document.getElementById(num + 'play');

        rowNum.style.display = 'none';
        playButton.style.display = 'block';
    }

    const hidePlayButton = (event) => {
        const num = event.target.parentElement.id[0];

        const rowNum = document.getElementById(num + 'num');
        const playButton = document.getElementById(num + 'play');

        rowNum.style.display = 'block';
        playButton.style.display = 'none';
    }

    const getDuration = (track) => {
        let duration_ms = track ? track.duration_ms : 0;
        let durationMin = Math.floor((duration_ms / 1000) / 60);
        let durationSec = Math.floor((duration_ms / 1000) % 60);
        if(durationSec < 10) {
            durationSec = '0' + durationSec;
        } 

        let duration = {
            minutes: durationMin,
            seconds: durationSec
        }

        return duration;
    }

    const getPlaybackState = async () => {
        await axios.get(apiUrl + '/me/player', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                // console.log(res.data);

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
            .then(() => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const playTrack = async (event) => {
        let elem = getRowElement(event.target);

        let index = elem.id[0];

        const track = type !== 'playlists' ? tracks[index] : tracks[index].track;


        await transferPlayback();
        await getPlaybackState();

        await axios.put(apiUrl + '/me/player/play', { content_uri: item.uri, uris: [track.uri] }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                device_id: player.device_id
            }
        })
            .then(() => {
                props.passPlayingFromView(true);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }


    return (
        <div id='item-view-page' className="text-center">

            <div id='item-info'>
                <a href={item.external_urls.spotify} target='_blank' rel="noreferrer">
                    {item.images[0] ? <img id='cover-pic' alt="Item cover image" src={item.images[0].url} /> : <img id='cover-pic' src={noImage} alt='Item cover image' />}
                </a>

                <h1 id='name'>{item.name}</h1>
            </div>

            <table id='tracks-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        {type === 'playlists' ? <th>Album</th> : null}
                        <th>Length</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks && tracks.map((track, index) => {

                    if(type === 'playlists') {
                        track = track.track;
                    }

                    const duration = getDuration(track);

                    return <tr id={index + 'row'} key={track.id} onMouseEnter={showPlayButton} onMouseLeave={hidePlayButton} onDoubleClick={playTrack}>
                        <td id={index + 'play-cell'} className="play-cell" onClick={playTrack}>
                            <p id={index + 'num'}>{index + 1}</p>
                            <div id={index + 'play'} className='play-icon'><FontAwesomeIcon  icon={faPlay} /></div>
                        </td>
                        <td id={index + 'name-cell'} className='name-cell'>
                               
                            {type !== 'albums' ? <img id={index + 'img'} className='album-img' src={track.album.images[0].url} /> : null}
                            <div id={index + 'title-artist'} className='title-artist'>
                                <span className='track-name'>{track.name}</span>
                                <br></br>
                                {track.artists && track.artists.map((artist, index) => {
                                    if(index < track.artists.length - 1) {
                                        return <span id={index+'artist' + artist.id} key={artist.id}>{artist.name}, </span>
                                    }
                                    else {
                                        return <span id={index + 'artist' + artist.id} key={artist.id}>{artist.name}</span>
                                    }
                                })}             
                            </div>
                                               
                        </td>
                        {type !== 'albums' ? <td id={index + 'album-name'}>
                            {track.album.name}
                        </td> : null}
                        <td id={index + 'duration'}>
                            {!isNaN(duration.minutes) && duration.minutes + ':' + duration.seconds}
                        </td>
                    </tr>
                    
                })}
                </tbody>
                
            </table>
           
            <p id='spotify-ref'>To view more details about this {typeVal}, <a id='external-link' href={item.external_urls.spotify} target='_blank' rel="noreferrer">click here</a>.</p>

            
        </div>
    )
}

export default ViewItem;