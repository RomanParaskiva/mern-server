import React, {useCallback, useContext, useEffect, useState} from 'react';
import {CardsList} from "../components/CardsList";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import FirstScreen from "../components/FirstScreen";


const MainPage = () =>{
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();
    const message = useMessage();
    const [cards, setCards] = useState([]);

    const fetchCards = useCallback(async () => {
        try {
            const data = await request('/api/item/', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setCards(data)
        } catch (e) {
            message(e.message)
        }
    },[request, message, token]);

    useEffect( () => {
        fetchCards()
    }, [fetchCards]);

    const arr = [];
    const tags = cards.map(card => card.tags.map(tag => arr.includes(tag) ? '' : arr.push(tag)))

    console.log(arr);

    if(loading) {
        return <Loader/>
    }
    return  (
        <div className="row">
            <FirstScreen/>
            { !loading && cards && <CardsList cards={cards}/> }
        </div>
    )
};

export default MainPage;