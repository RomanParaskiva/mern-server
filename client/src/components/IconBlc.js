import React from 'react';

const IconBlc = (props) => {
    return (
            <div className="icon_blc">
                <i className="material-icons">favorite_border</i><span>{props.likes}</span>
            </div>
        )
}

export default IconBlc;