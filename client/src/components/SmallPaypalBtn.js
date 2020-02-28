import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";

const SmallPaypalBtn = (props) => {
    const [form, setForm] = useState({
        cmd: '_xclick',
        business: '2XG2ZGHJR9WSQ',
        lc: "GB",
        item_name: props.name,
        amount: props.price,
        currency_code: "USD",
        button_subtype: 'services',
        bn: "PP-BuyNowBF:btn_buynowCC_LG.gif:NonHosted"
    })

    const { request, error, clearError} = useHttp()

    const clickHandler = async event => {
        if(event.target.name == 'submit') {
            try {
                const data = await request ('https://www.paypal.com/cgi-bin/webscr', 'POST')
            } catch (e) {

            }
        }
    }



    return(
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_xclick"/>
                <input type="hidden" name="business" value="2XG2ZGHJR9WSQ"/>
                    <input type="hidden" name="lc" value="GB"/>
                        <input type="hidden" name="item_name" value={props.name}/>
                            <input type="hidden" name="amount" value={props.price}/>
                                <input type="hidden" name="currency_code" value="USD"/>
                                    <input type="hidden" name="button_subtype" value="services"/>
                                        <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynow_LG.gif:NonHosted"/>
                                            <input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!"/>
                                                <img alt="" border="0" src="https://www.paypalobjects.com/ru_RU/i/scr/pixel.gif" width="1" height="1"/>
        </form>


)
}

export default SmallPaypalBtn