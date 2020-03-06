import React, {useContext} from 'react';
import Image from './Image';
import SmallPaypalBtn from "./SmallPaypalBtn";
import {AuthContext} from "../context/AuthContext";

const Card = (card) => {
    const {token} = useContext(AuthContext)
    const item = card.card
    const imageSrc = item.imgs.length < 1 ? `./images/nope.jpg` : item.imgs[0]
    const payments = token? <SmallPaypalBtn price={item.price} name={item.title}/> : <div><p>For buy <a href="/auth">Sign In / Sign Up</a></p></div>

    return (
            <div className="col l3 m6 s12">
                <a href={'/detail/' + item._id}

                   className="card_link" >
                <div className="card hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <Image src={imageSrc}/>
                    </div>
                    <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    {item.title}

                                </span>
                        <span className="activator grey-text text-darken-4">
                                   $ {item.price}
                                </span>

                        <div className="card_btn_wrapper mt">
                            <div className="mb">
                                {payments}
                            </div>
                            <span className="likes_wrapper"><i className="material-icons">favorite_border</i><span>{item.likes}</span></span>
                        </div>
                    </div>
                </div>
                </a>
            </div>

        )
    };

export default Card;