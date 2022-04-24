import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../../css/UserSection.css';

const UserSection = (props) => {
    const profile = props.profile;
    const url = props.url;
    let isDisplayed = false;

    useEffect(() => {
        document.getElementById('dropdown-menu').style.display = 'none';
        document.getElementById('up-icon').style.display = 'none';
        document.getElementById('down-icon').style.display = 'flex';
        isDisplayed = false;
    }, []);
    
    const toggleMenu = (event) => {
        const downIcon = document.getElementById('down-icon');
        const upIcon = document.getElementById('up-icon');
        const dropdownMenu = document.getElementById('dropdown-menu');

        isDisplayed = !isDisplayed;

        if(isDisplayed) {
            downIcon.style.display = 'none';
            upIcon.style.display = 'flex';
            dropdownMenu.style.display = 'flex';
            dropdownMenu.style.flexDirection = 'column';

        }
        else {
            downIcon.style.display = 'flex';
            upIcon.style.display = 'none';
            dropdownMenu.style.display = 'none';
        }

    }

    return (
        <div>
            <div id="user-section" onClick={toggleMenu}>
                <img id="user-picture" src={profile.images[0].url} />
                <p id="user-name">{profile.display_name}</p>
                <FontAwesomeIcon id='down-icon' className="user-icons" icon={faCaretDown} />
                <FontAwesomeIcon id='up-icon' className="user-icons" icon={faCaretUp} />
            </div>

            <div id="dropdown-menu" className="text-left">
                <a className='dropdown-links' href={`${profile.external_urls.spotify}`} target="_blank">Profile</a>
                <a className='dropdown-links' href={`${url}/logout`}>Log Out</a>
            </div>
        </div>
        
    )
}

export default UserSection;