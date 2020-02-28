import React, {useState} from 'react';
import Slider from 'infinite-react-carousel';


const CustomSlider = (props) => {
    const settings =  {
        arrows: false,
        arrowsBlock: false,
        autoplay: false,
        autoplaySpeed: 4000,
        centerMode: true,
        dots: true,
        overScan: 1,
        shift: 90,
        wheel: true
    }



    console.log(props.img)

    return (
        <div className="slider">
            {/*<Slider { ...settings }>*/}
            {/*    {a}*/}
            {/*</Slider>*/}
        </div>
        )
}

export default CustomSlider;