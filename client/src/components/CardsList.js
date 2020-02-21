import React from 'react'
import Card from "./Card";

export const CardsList = ({ cards }) => {
    if(!cards.length) {
        return <p className="center">Товаров пока нет</p>
    }

    return (
        <div>
            {cards.map(card => <Card key={card.index + 1} card={card}/>)}
        </div>
    )
}