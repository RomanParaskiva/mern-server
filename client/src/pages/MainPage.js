import React, {useContext, useState} from 'react';
import {CardsList} from "../components/CardsList";
import FirstScreen from "../components/FirstScreen";
import {CardContext} from "../context/CardContext";


const MainPage = () =>{
    const {cards} = useContext(CardContext)
    const [filterResult, setFilterResult] = useState([])

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



    return  (

        <div className="row">
            <FirstScreen/>
            
            <div className="welkome_blc black-text mt mb">
                <p className="info_title">LATEST BUNDLES</p>
            </div>
            <div className="chips_filter_blc container">
                {tagsBtn}
            </div>
            { cards && <CardsList cards={filterResult.length > 0 ? filterResult : cards} /> }
        </div>

    )
};

export default MainPage;