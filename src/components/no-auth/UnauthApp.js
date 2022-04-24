import React, { useState, useEffect } from "react";
import Login from "./Login";

const UnauthApp = (props) => {
    const url = props.url;

    return (
        <div>
            <Login url={url} />
        </div>
    )
}

export default UnauthApp;