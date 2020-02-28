import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import Loader from "../components/Loader";
import DetailCard from "../components/DetailCard";



const DetailPage = () =>{
    const {request,loading} = useHttp()
    const message = useMessage()
    const [card, setCard] = useState(null)
    const id = useParams().id

    const getCard = useCallback(async () => {
        try {
            const data = await request(`/api/item/${id}`, 'GET', null);
            setCard(data)
        } catch (e) {
            console.log(e.message)
        }
    },[request, id])

    useEffect( () => {
        getCard()
    }, [getCard])

    if(loading) {
        return <Loader/>
    }

    return  (
        <>
            { !loading && card && <DetailCard card={card}/> }
        </>
    )
}

export default DetailPage;