import React, {useContext} from 'react'
import IconBlc from "./IconBlc";
import * as M from 'materialize-css'
import PaypalBtn from "./PaypalBtn";
import {AuthContext} from "../context/AuthContext";

const DetailCard = ({ card }) => {
    setTimeout(() => {
        const image = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(image);
        const chips = document.querySelectorAll('.chips');
        M.Chips.init(chips);
        },10)

    const {token, likeCards} = useContext(AuthContext)
    const chips = card.tags.map(chip => <div className="chip" key={chip}>{chip}</div> );
    const imageSrc = card.imgs.length < 1 ? `./images/nope.jpg` : card.imgs[0]

    const payment = token ? <PaypalBtn id={card._id} price={card.price} name={card.title}/> : <p> For buy this item you need <a href="/auth">register</a> or <a href="/auth">login</a></p>
    return(
        <div className="cardBox row">
            <div className="block col l6">
                <img className="responsive-img materialboxed" width="650" alt={card.title} src={require(`${imageSrc}`)}/>
            </div>

            <div className="block col l6">
                <h5 className="detail_title">{card.title}</h5>
                <div className="divider"/>
                <div className="chips_box">
                    {chips}
                </div>
                <div className="divider"/>
                <div className="desc_block">
                    <div className="w-50 left-align">
                        <h5>Description</h5>
                        {card.description}
                    </div>
                    <div className="w-50 left-align">
                        <h5>Instant Download</h5>
                        <span className="darkgrey-text">Your files will be available to download once payment is confirmed.</span>
                        <p>I don't accept returns, exchanges, or cancellations. But please contact me if you have any problems with your order.</p>
                    </div>
                </div>

                <div className="divider"/>
                <div className="col 12 action_btn_wrapper">
                    <div className="price_wrapper">
                        <p className="price"> $ {card.price}</p>
                        <span>VAT Included</span>
                    </div>
                    <div className="wrapper">
                        <i className="small material-icons mr">cloud_download</i>
                        <p>Digital download (1 ZIP)</p>
                    </div>
                </div>
                <div className="divider divider_padding"/>
                <div className="col 12 action_btn_wrapper">
                    {payment}
                    <img src="https://www.paypalobjects.com/webstatic/en_SG/mktg/Logos/AM_mc_vs_dc_ae.jpg" alt="PayPal acceptance mark" scale="0"/>
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}

export default DetailCard