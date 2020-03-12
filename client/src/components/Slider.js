import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const Slider = ({images}) => {
    const imgs = images.map(img => (<div key={img._id} className="slideWrapper"><img src={img.src} alt={img.title}/></div>))


    const params = {
        showThumbs: false,
        showStatus: false,
        infiniteLoop: true,
        useKeyboardArrows: true,
        autoPlay: true,
        stopOnHover: true,
        interval: 5000,
        transitionTime: 450
    }

    return (
        <Carousel {...params}>
            {imgs}
        </Carousel>
    )
}

export default Slider;