import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../../css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchResponse from "./SearchResponse";


const Search = (props) => {
    const { apiUrl, token, deviceID } = props;

    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const search = () => {
        // console.log(query);

        if(query) {
            setTimeout(() => {
                axios.get(apiUrl + '/search', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    params: {
                        q: query,
                        type: 'album,artist,playlist,track',
                        limit: 5
                    }
                })
                    .then((res) => {
                        console.log(res);
                        setResponse(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log(err.response ? err.response.data : err);
                    });
            }, 1000);
        }

        
    } 

    useEffect(() => {
        const func = async () => {
            await search();
        }

        func();
    }, [query]);

    return (
        <div id='search-page'>
            <div id='search-bar'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input id='search' name='search' type='text' placeholder='Search here' autoComplete="off" onChange={handleChange} />
            </div>

            {response && <div>
                <SearchResponse array={response.albums.items} title='Albums' token={token} apiUrl={apiUrl} deviceID={deviceID} type='albums' />
                <SearchResponse array={response.artists.items} title='Artists' token={token} apiUrl={apiUrl} deviceID={deviceID} type='artists' />
                <SearchResponse array={response.playlists.items} title='Playlists' token={token} apiUrl={apiUrl} deviceID={deviceID} type='playlists' />
            </div>}

            <div id='playlists'>

            </div>

            <div id='artists'>

            </div>            
        </div>
    )
}

export default Search;