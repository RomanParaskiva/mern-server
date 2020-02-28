import React from 'react';


const Image = (props) => {
    const imageClass = props.imgCls ? props.imgCls : "activator"

    return (
        <img className={imageClass} width="650" alt={props.title} src={require(`${props.src}`)}/>
    )
};

export default Image;
