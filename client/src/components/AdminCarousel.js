import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext'
import Slider from "./Slider";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import axios from "axios";
import CarouselLoader from "./CarouselLoader";

const AdminCarousel = () => {
    const [images, setImages] = useState([])
    const [image,setImage] = useState({
        src: '',
        alt: ''
    })
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const message = useMessage();

    const fetchImgs = useCallback(async () => {
        try {
            const data = await request ('/api/item/adminka/getSlides', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setImages(data)
        } catch (e) {
            message(e)
        }
    },[message, request])

    useEffect(() => {
        fetchImgs()
    },[fetchImgs])

    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    const fileHandler = (event) => {
        preventDefaults(event)
        const file = event.target.files[0]
        previewFile(file)
        let fd = new FormData();
        fd.append('file', file)
        fd.append('filename', file.name)
        axios.post('/api/item/uploadSlideImage', fd)
            .then(res => {
                image.src = (res.data.file);
                console.log(res.data.file.path)
            })
    }

    const previewFile = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            image.src = reader.result;
            document.getElementById('gallery').appendChild(img)
        }
    }

    const handleChange = event => {
        setImage({...image, [event.target.name]: event.target.value});
    }

    const clearForm = () => {
        window.location = window.location
    }

    const submitImg = async () => {
        try {
            const data = await request('/api/item/createSlide', 'POST', {title: image.alt, src: image.src},{
                Authorization: `Bearer ${token}`
            })
            message(data.message)
            clearForm()
        } catch (e) {
            message(e.message)
        }


    }

    const closeHandler = async event => {

        console.log(event.target.dataset.index)
        try {
            const data = await request('/api/item/deleteSlide', 'POST', {id: event.target.dataset.index},{})
            message(data.message)

            clearForm()
        } catch (e) {
            message(e.message)
        }

    }

    console.log(images)

    const imgBlc = images.map(img =><div className='img_wrapper'><img width="200" src={img.src} key={img._id}/><button data-index={img._id} onClick={closeHandler} className="close">Удапить</button> </div> )

    if (loading) return <CarouselLoader/>

    return (
        <div className="container">
            <Slider images={images}/>

            <div id="gallery">
                {imgBlc}
            </div>

            <h3>Добавьте изображения для слайдера</h3>
            <div className="carousel_form_wrapper">
                <input type="file" onChange={fileHandler} name="filedata"/>
                <input type="text" name="alt" placeholder="Описание изображения (на английском)" onChange={handleChange}/>
            </div>

            <button className="btn-large" onClick={submitImg}>Добавить слайд</button>


        </div>

    )

}

export default AdminCarousel