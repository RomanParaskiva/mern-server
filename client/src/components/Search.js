import React, {useCallback, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

const Search = () => {
    const [query, setQuery] = useState('')
    const [cards, setCards] = useState([])
    const {message} = useMessage()
    const {request,loading} = useHttp()

    const inputHandler = event => {
        setQuery(event.target.value)
    }




    return(
        <div>
            <div className="search_input container">
                <i className="material-icons small">search</i>
                <label className="search_label" htmlFor="search_input">
                    <input type="text" value={query} onChange={inputHandler} id="search-input" placeholder="Search"/>
                </label>
            </div>

        </div>
    )
}

export default Search