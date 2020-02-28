import React, {useState} from 'react';
import Image from './Image';
import SmallPaypalBtn from "./SmallPaypalBtn";


const Card = (card) => {

    const item = card.card
    const imageSrc = item.imgs.length < 1 ? `./images/nope.jpg` : item.imgs[0]
    const shortTitle = item.title.length > 20 ? item.title.slice(0,15) : item.title


    return (
            <div className="col l3 m4 s12">
                <div className="card hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <Image src={imageSrc}/>
                    </div>
                    <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    {shortTitle}
                                    <i className="material-icons right">more_vert</i>
                                </span>
                        <span className="activator grey-text text-darken-4">
                                   $ {item.price}
                                </span>

                        <div className="card_btn_wrapper mt">
                            <SmallPaypalBtn price={item.price} name={item.title}/>

                            <a href={'/detail/' + item._id}
                               className="waves-effect waves-light white black-text btn mr ">More info</a>
                            <span className="likes_wrapper"><i className="material-icons">favorite_border</i><span>{item.likes}</span></span>
                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{item.title}<i
                            className="material-icons right">close</i></span>
                        <p className="card-description">{item.description}</p>
                    </div>
                </div>
            </div>
        )
    };

export default Card;