import React from "react";
import Icon from "../icons/Icon";

const SearchResponse = (props) => {
    const { token, deviceID, apiUrl, array, type, title } = props;

    // useEffect(() => {
    //     console.log(token);
    //     console.log(deviceID);
    //     console.log(apiUrl);
    //     console.log(array);
    //     console.log(type);
    // }, [array]);

    return (
        <div>
            <h1>{title}</h1>

            <div className='response-section'>
            {
                array.map((item) => {
                    console.log(item);
                    return <Icon key={item.id} item={item} type={type} token={token} deviceID={deviceID} apiUrl={apiUrl} />
                })
            }
            </div>
            
        </div>
    )
}

export default SearchResponse;