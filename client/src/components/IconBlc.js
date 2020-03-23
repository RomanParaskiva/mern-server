import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const IconBlc = (props) => {
    const [like, setLike] = useState(props.likes)
    const {token, userId} = useContext(AuthContext)
    const {request} = useHttp()
    const {message} = useMessage()

console.log(like)

    const likeHandler = useCallback(async (event) => {
        if(event.target.classList.contains('active')){
            event.target.classList.remove('active')
            setLike(like - 1)
        } else {
            event.target.classList.add('active')
            setLike(like + 1)
            try {
                const data = await request('/api/user/addLike', 'PUT', {cardId: event.target.id, userId: userId},{
                    Authorization: `Bearer ${token}`
                })
            } catch (e) {
                console.log(e.message)
            }

        }
    },[like])



    return (
            <div className="icon_blc">
                <i id={props.id} onClick={likeHandler} className="material-icons" >favorite_border</i><span>{like}</span>
            </div>
        )
}

export default IconBlc;