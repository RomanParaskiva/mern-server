import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {CardsList} from "../components/CardsList";






const AdminPage = () =>{
    const {loading, request} = useHttp()
    const message = useMessage()
    const [cards, setCards] = useState([])
    const {token} = useContext(AuthContext)

    const fetchCards = useCallback(async () => {
        try {
            const data = await request('/api/item/adminka/getCollection', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setCards(data)
        } catch (e) {
            message(e.message)
        }
    },[token, request])

    useEffect( () => {
        fetchCards()
    }, [fetchCards])


    return  (
        <div className="row">
            {!loading && <CardsList cards={cards}/>}
        </div>
    )
}

export default AdminPage;