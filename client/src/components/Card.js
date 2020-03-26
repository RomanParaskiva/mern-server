import React, {useCallback, useContext, useEffect, useState} from 'react';
import Image from './Image';
import SmallPaypalBtn from "./SmallPaypalBtn";
import {AuthContext} from "../context/AuthContext";
import IconBlc from "./IconBlc";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const Card = (card) => {
    const {token, userId} = useContext(AuthContext)
    const {request} = useHttp()
    const {message} = useMessage()
    const [cardData, setCardData] = useState(card)
    const [likeCount, setLikeCount] = useState(card.likes)


    const likeHandler = (event) => {
        if(event.target.classList.contains('active')) {
            event.target.classList.remove('active')
            deleteLike(event)
        } else {
            event.target.classList.add('active')
            addLike(event)
        }
    }



    const addLike = async (event) => {
        try {
            const data = await request('/api/user/addLike', 'PUT', {cardId: event.target.id, userId: userId},{
                Authorization: `Bearer ${token}`
            })

            setLikeCount(likeCount + 1)
            console.log(likeCount)
            const ls = JSON.parse(localStorage.getItem('userData'))

            if(!ls.likes.includes(data)){
                ls.likes.push(data)
                localStorage.setItem('userData', JSON.stringify({token: ls.token, userId: ls.userId, likes: ls.likes}))
            }

        } catch (e) {
            console.log(e.message)
        }

    }


    const deleteLike = async (event) => {
        try {
            const data = await request('/api/user/deleteLike', 'POST', {cardId: event.target.id, userId: userId},{
                Authorization: `Bearer ${token}`
            })

            setLikeCount(likeCount - 1)

            const ls = JSON.parse(localStorage.getItem('userData'))
            console.log(ls)
            if(ls.likes.includes(data)){
                const index = ls.likes.indexOf(data,0)
                ls.likes.splice(index,1)
                localStorage.setItem('userData', JSON.stringify({token: ls.token, userId: ls.userId, likes: ls.likes}))
            }

        } catch (e) {
            console.log(e)
        }
    }


    const imageSrc = card.imgs.length < 1 ? `./images/nope.jpg` : card.imgs[0]
    const payments = token? <SmallPaypalBtn price={card.price} name={card.title}/> : <div><p>For buy <a href="/auth">Sign In / Sign Up</a></p></div>
    return (
            <div className="col l3 m6 s12">

                <div className="card hoverable">
                <a href={'/detail/' + card._id}

                   className="card_link" >
                    <div className="card-image waves-effect waves-block waves-light">
                        <Image src={imageSrc}/>
                    </div>
                </a>
                    <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    {card.title}

                                </span>
                        <span className="activator grey-text text-darken-4">
                                   $ {card.price}
                                </span>

                        <div className="card_btn_wrapper mt">
                            <div className="mb">
                                {payments}
                            </div>
                            <IconBlc id={card._id} likes={likeCount} likeHandler={likeHandler}/>
                        </div>
                    </div>
                </div>

            </div>

        )
    };

export default Card;