import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import DetailCard from "../components/DetailCard";
import {useAuth} from "../hooks/auth.hook";



const DetailPage = () =>{
    const {request,loading} = useHttp()
    const [card, setCard] = useState(null)
    const id = useParams().id
    const {token} = useAuth()


    const getCard = useCallback(async () => {
        try {
            const data = await request(`/api/item/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setCard(data)
        } catch (e) {
            console.log(e.message)
        }
    },[request, id, token])

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