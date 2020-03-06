import React from 'react'
import Card from "./Card";

export const CardsList = ({ cards }) => {
    if(!cards.length) {
        return <p className="center">Товаров пока нет</p>
    }


    return (
        <div className="section" id="cardlist">
            <h2 className="center-align">LATEST BUNDLES</h2>
            {cards.map(card => <Card key={card._id} card={card}/>)}
        </div>
    )
}