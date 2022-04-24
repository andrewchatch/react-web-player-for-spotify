import React, { useState, useEffect } from 'react';


const Login = (props) => {
    const url = props.url;

    return (
        <div className="text-center">
            <h1>Welcome</h1>

            <a href={`${url}/auth/spotify`}><button className='btn btn-primary' onClick={() => { 
                document.getElementsByTagName('body')[0].style.display = 'none';}}>Log In</button></a>
            
            <p style={{marginTop: '5vh', width: '40vw', marginLeft: 'auto', marginRight: 'auto'}} >Please note: This project was created only as a learning experience and as an opportunity to showcase my skills as a developer. I am not profiting financially from this project in any way. </p>
        </div>
    )
}

export default Login;