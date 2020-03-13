import React, {useCallback, useContext, useEffect, useState} from 'react';
import {CardsList} from "../components/CardsList";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import FirstScreen from "../components/FirstScreen";
import Search from "../components/Search";
import * as M from "materialize-css";


const MainPage = () =>{
    const {token} = useContext(AuthContext);
    const {loading, request} = useHttp();
    const message = useMessage();
    const [cards, setCards] = useState([]);
    const [filterResult, setFilterResult] = useState([])

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

    const filterHandler = event => {
        const query = event.target.value
        setFilterResult(filterByTag(cards, query))
    }

    const filterByTag = (cards, value)=> {
        return cards.filter(card => card.tags.includes(value))
    }

    const tagsArr = [],
        tags = cards.map(card => card.tags.map(tag => tagsArr.includes(tag) ? '' : tagsArr.push(tag)));

    const tagsBtn = tagsArr.map(tag => <button onClick={filterHandler} value={tag} className="btn-flat">{tag}</button>)

    tagsBtn.push(<button onClick={() => setFilterResult([])} className="btn">All</button>)


    if(loading) {
        return <Loader/>
    }
    return  (
        <div className="row">
            <FirstScreen/>
            <div className="chips_filter_blc container">
                {tagsBtn}
            </div>
            { !loading && cards && <CardsList cards={filterResult.length > 0 ? filterResult : cards} /> }
        </div>
    )
};

export default MainPage;