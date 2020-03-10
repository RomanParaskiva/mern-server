import React from 'react'
import Image from '../components/Image'

const Carousel = ({images}) => {
    console.log(images)
    const imgs = images.map(img => (<div className="carousel-item"><Image src={img.src} alt={img.title}/></div>))


    return (
        <div className="carousel carousel-slider center">
            <div className="carousel-fixed-item center">
                <a className="btn waves-effect white grey-text darken-text-2">button</a>
            </div>
            {imgs}
        </div>
    )
}

export default Carousel;