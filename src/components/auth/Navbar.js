import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import spotifyLogo from '../../images/spotify-logo.png'; 
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../css/Navbar.css';

const Navbar = (props) => {
    
    return (
        <div id='navbar' className="text-center">
            <img id='spotify-logo' src={spotifyLogo} alt="Spotify Logo" />

            <div id="nav-links-section">
                <Link to='/auth' ><FontAwesomeIcon id="home-icon" className="icon" icon={faHouse} />Home</Link>
                <Link to="/auth/search" ><FontAwesomeIcon id="search-icon" className="icon" icon={faMagnifyingGlass} />Search</Link>
            </div>
        </div>
    )
}

export default Navbar;