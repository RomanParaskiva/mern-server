import React from 'react';

const IconBlc = (props) => {
    return (
            <div className="icon_blc mt-1">
                <i className="material-icons ">favorite_border</i><span>{props.likes}</span>
            </div>
        )
}

export default IconBlc;