import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const AdminNavbar = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return(
        <nav>
            <div className="nav-wrapper">
                <a href="/adminka" className="brand-logo">Админка</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/adminka/new">Новый товар</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                </ul>
            </div>
        </nav>
    )
}