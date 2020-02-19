import React, {useState} from 'react';
import IconBlc from "./IconBlc";
import Image from './Image';


const Card = (props) => {
    const [card, setCard] = useState({
        title: props.title,
        description: props.description,
        price: props.price,
        tags: props.tags,
        likes: props.likes,
        imgs: props.imgs,
    });

        const imageSrc = props.imgs.length < 1 ? `./images/nope.jpg` : props.imgs[0]

    return (
            <div className="col l3 m6 s12">
                <div className="card hoverable">
                    <div className="card-image waves-effect waves-block waves-light">
                        <Image src={imageSrc}/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {props.title}
                            <i className="material-icons right">more_vert</i>
                            <IconBlc likes={props.likes}/>
                        </span>
                        <div className="card_btn_wrapper">
                            <a className="waves-effect waves-light cyan darken-1 btn mr-1 mt-1">КУПИТЬ</a>

                            <a href="#"
                               className="waves-effect waves-light cyan darken-1 btn mr-1 mt-1">Подробнее</a>

                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{props.title}<i
                            className="material-icons right">close</i></span>
                        <p className="card-description">{props.desc}</p>
                    </div>
                </div>
            </div>
        )
    };

export default Card;