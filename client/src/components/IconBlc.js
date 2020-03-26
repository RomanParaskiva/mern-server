import React, {useCallback, useContext, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const IconBlc = (props) => {
    const {likeCards} = useContext(AuthContext)


    const cls = likeCards && likeCards.includes(props.id)? 'active' : ''



    return (
            <div className="icon_blc" onClick={props.likeHandler}>
                <i id={props.id}  className={'material-icons ' + cls} >favorite_border</i><span>{props.likes}</span>
            </div>
        )
}

export default IconBlc;