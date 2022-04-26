import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faShuffle, faRepeat } from '@fortawesome/free-solid-svg-icons';
import '../../../css/PlaybackConsole.css';
import { player } from './ScriptCode';
import 'jquery.marquee';

const PlaybackConsole = (props) => {

    let currentPlaybackState = '';
    let timer = '';
    const [currentTrack, setCurrentTrack] = useState({});
    const [duration, setDuration] = useState('');
    const [progress, setProgress] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const token = props.token;
    const apiUrl = props.apiUrl;
    const playingFromView = props.playingFromView;

    useEffect(() => {
        const func = async () => {
            if(token) {
                await getPlaybackState();
            }
        }

        func();
        
    }, [token]);

    const getCurrentTrack = async () => {
        await axios.get(apiUrl + '/me/player/currently-playing', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setCurrentTrack(res.data.item);
            })
            .catch(async (err) => {
                console.log(props.refreshToken);

                if(err.status === 401) {
                    await axios.get(props.url + '/refresh_token', {
                        refresh_token: props.refreshToken
                    })
                        .then(() => {
                            // console.log(res);
                        })
                        .catch((err) => {
                            console.log(err.response.data);
                        });
                }
                console.log(err.response);
            });
    }

    const getRecentlyPlayed = async () => {
        await axios.get(apiUrl + '/me/player/recently-played', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if(!currentTrack) {
                    setCurrentTrack(res.data.items[0].track);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });

    } 

    const getPlaybackState = async () => {
        await axios.get(apiUrl + '/me/player', {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                currentPlaybackState = res.data;
                setIsPlaying(currentPlaybackState.is_playing);
                setCurrentTrack(res.data.item);
                
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    // const getDevices = async () => {
    //     await axios.get(apiUrl + '/me/player/devices', {
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res.data.devices);
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //         });
    // }

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

    const togglePlayback = async () => {
        document.getElementById('toggle-playback').disabled = true;
        setTimeout(() => {
            document.getElementById('toggle-playback').disabled = false;
        }, 2000);
        if(isPlaying) {
            await pausePlayback();
            await setIsPlaying(false);
        }
        else {
            await playCurrentTrack();
            await setIsPlaying(true);
        }
    }

    const toggleShuffle = async () => {
        await getPlaybackState();
        let bool = !currentPlaybackState.shuffle_state;
        const shuffle = document.getElementById('shuffle');
        shuffle.style.color = bool ? 'rgb(30,185,85)' : 'white';

        await axios.put(apiUrl + '/me/player/shuffle', {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                state: bool,
                device_id: player.device_id
            }
        })
            .then(() => {
                // console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            });

        await getPlaybackState();
    }

    const toggleRepeat = async() => {
        
        await getPlaybackState();
        let currentRepeatState = currentPlaybackState.repeat_state;
        const repeat = document.getElementById('repeat');
        const one = document.getElementById('one');

        repeat.disabled = true;
        setTimeout(() => {
            repeat.disabled = false;
        }, 2000);

        let newRepeatState = '';

        switch(currentRepeatState) {
            case 'off':
                one.style.visibility = 'hidden';
                repeat.style.color = 'rgb(30,185,85)';
                newRepeatState = 'context';
                break;
            case 'context':
                one.style.visibility = 'visible';
                repeat.style.color = 'rgb(30,185,85)';
                newRepeatState = 'track';
                break;
            case 'track':
                one.style.visibility= 'hidden';
                repeat.style.color = 'white';
                newRepeatState = 'off';
                break;
        }

        await axios.put(apiUrl + '/me/player/repeat', {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                state: newRepeatState,
                device_id: player.device_id
            }
        })
            .then(() => {
                console.log(newRepeatState);
            })
            .catch((err) => {
                console.log(err.response);
            });

    } 

    const playCurrentTrack = async () => {
        await transferPlayback();


        if(!currentPlaybackState.isPlaying) {
            await axios.put(apiUrl + '/me/player/play', { device_id: player.device_id}, {
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

        await getPlaybackState();
        await getCurrentTrack();
    }

    const pausePlayback = async () => {
        clearTimeout(timer);
        await axios.put(apiUrl + '/me/player/pause', { device_id: player.device_id}, {
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
            })
    }

    const previousTrack = async () => {
        clearTimeout(timer);
        setIsPlaying(true);
        await getPlaybackState();

        if(currentPlaybackState.progress_ms > 4000) {
            await axios.put(apiUrl + '/me/player/seek', { device_id: player.device_id }, {
                params: {
                    position_ms: 1,
                    device_id: player.device_id
                },
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
        else {
            await axios.post(apiUrl + '/me/player/previous', { device_id: player.device_id}, {
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

        await getPlaybackState();
        await getCurrentTrack();
        
    }

    const nextTrack = async () => {
        clearTimeout(timer);
        setIsPlaying(true);

        await axios.post(apiUrl + '/me/player/next', { device_id: player.device_id}, {
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

        await getPlaybackState();
        await getCurrentTrack();
    }

    useEffect(() => {
        getDuration();
    }, [duration]);

    const getDuration = async () => {
        let duration_ms = currentTrack ? currentTrack.duration_ms : 0;
        let durationMin = Math.floor((duration_ms / 1000) / 60);
        let durationSec = Math.floor((duration_ms / 1000) % 60);
        if(durationSec < 10) {
            durationSec = '0' + durationSec;
        } 

        setDuration({
            minutes: durationMin,
            seconds: durationSec
        });
    }

    useEffect(() => {
        const func = async () => {
            await getCurrentTrack();

            if(!currentTrack) {
                await getRecentlyPlayed();
            }
        }

        if(token) {
            func();
        }

    }, [token]);

    useEffect(() => {
        const checkCurrentTrack = async () => {
            if(token && player && !isPlaying) {
                await getPlaybackState();
                await getCurrentTrack();
            }
        }
        
        checkCurrentTrack();
    }, [playingFromView]);

    useEffect(() => {

        const getProgress = async () => {
            let progress_ms = currentPlaybackState ? currentPlaybackState.progress_ms : 0;

            let progressMin = Math.floor((progress_ms / 1000) / 60);
            let progressSec = Math.floor((progress_ms / 1000) % 60);
            if(progressSec < 10) {
                progressSec = '0' + progressSec;
            }

            setProgress({
                minutes: progressMin,
                seconds: progressSec
            });
        }

        const checkPlaying = async () => {
            if(token) {
                await getPlaybackState();
            }
            getProgress();
            if(currentPlaybackState.is_playing) {
                document.getElementById('play-icon').style.display = 'none';
                document.getElementById('pause-icon').style.display = 'block';
            }
            else {
                document.getElementById('play-icon').style.display = 'block';
                document.getElementById('pause-icon').style.display = 'none';
            }
        }


        timer = setTimeout(async () => {
            if(token && player) {
                checkPlaying();
            }

        }, 1000);


        
        props.passDeviceID(player.device_id);
    }, [currentTrack]);

    return (
        <div id="playback">
            {currentTrack && 
                <div id="current-track-section">
                    <img id="current-track-img" src={currentTrack.album && currentTrack.album.images[0].url} />

                    <div id="current-track-info">
                        <p id="track-name">{currentTrack.name && currentTrack.name}</p>
                        <p id="artist-name">{currentTrack.artists && currentTrack.artists.map((artist, index) => {
                            if(index < currentTrack.artists.length - 1) {
                                return <span className="marquee" key={artist.id}>{artist.name}, </span>
                            }
                            else {
                                return <span key={artist.id}>{artist.name}</span>
                            }
                        })}</p>
                    </div>
                </div>
            }

            <div id="playback-section" className="text-center">
                <button id="shuffle" onClick={toggleShuffle} className='btn btn-primary btn-playback'><FontAwesomeIcon icon={faShuffle} /></button>
                <button id="previous" onClick={previousTrack} className='btn btn-primary btn-playback'><FontAwesomeIcon icon={faStepBackward} /></button>
                <button id="toggle-playback" onClick={togglePlayback} className='btn btn-primary btn-playback'><FontAwesomeIcon id="play-icon" icon={ faPlay } /><FontAwesomeIcon id="pause-icon" icon={ faPause } /></button>
                <button id="next" onClick={nextTrack} className='btn btn-primary btn-playback'><FontAwesomeIcon icon={faStepForward} /></button>
                <button id="repeat" className='btn btn-primary btn-playback' onClick={toggleRepeat}><FontAwesomeIcon icon={faRepeat} /><span id='one'>1</span></button>


                <div id="progress-bar">
                    {!isNaN(progress.minutes) && progress.minutes + ':' + progress.seconds} <span> / </span>
                    {!isNaN(duration.minutes) && duration.minutes + ':' + duration.seconds}
                </div>
            </div>
        </div>
    )
}

export default PlaybackConsole;
