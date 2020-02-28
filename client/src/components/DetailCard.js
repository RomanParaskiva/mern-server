import React from 'react'
import IconBlc from "./IconBlc";
import * as M from 'materialize-css'
import PaypalBtn from "./PaypalBtn";

const DetailCard = ({ card }) => {
    setTimeout(() => {
        const image = document.querySelectorAll('.materialboxed')
        const i = M.Materialbox.init(image);
        const chips = document.querySelectorAll('.chips');
        const instances = M.Chips.init(chips);
        },10)
    const chips = card.tags.map(chip => <div className="chip" key={chip}>{chip}</div> );
    const imageSrc = card.imgs.length < 1 ? `./images/nope.jpg` : card.imgs[0]
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
                    <div className="w-50 left-align">{card.description}</div>
                    <div className="w-50 left-align">
                        <span className="grey-text">Delivery</span>
                        <h5>Instant Download</h5>
                        <span className="darkgrey-text">Your files will be available to download once payment is confirmed.</span>
                        <h6>I don't accept returns, exchanges, or cancellations. But please contact me if you have any problems with your order.</h6></div>
                </div>

                <div className="divider"/>
                <div className="col 12 action_btn_wrapper">
                    <div>
                        <p className="price"> $ {card.price}</p>
                        <span>VAT Included</span>
                    </div>
                    <IconBlc likes={card.likes}/>
                    <div >
                        <PaypalBtn price={card.price} name={card.title}/>
                    </div>
                    <div className="wrapper">
                        <i className="small material-icons mr">cloud_download</i>
                        <p>Digital download (1 ZIP)</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailCard