import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Slider from "./Slider";
import CarouselLoader from './CarouselLoader'

const FirstScreen = () =>{
    const {token} = useContext(AuthContext);
    const [images, setImages] = useState([])
    const {request,loading} = useHttp()

    const fetchImages = useCallback(async () => {
        try {
            const data = await request('/api/item/carousel', 'GET', null, {})
            setImages(data)
        } catch (e) { }
    },[request,token])

    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    if(loading) {
        return (
            <CarouselLoader/>
        )
    }

    return(
        <div className="section first_screen">
            {!loading && images.length > 0 && <Slider images={images}/>}
        </div>
    )
}

export default FirstScreen