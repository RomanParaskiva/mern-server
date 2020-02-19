import React from 'react';


const Image = (props) => {
    return (
        <img className="activator" width="650" alt="image" src={require(`${props.src}`)}/>
    )
};

export default Image;
