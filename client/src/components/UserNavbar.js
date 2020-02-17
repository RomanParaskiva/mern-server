import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";

export const UserNavbar = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    const logBtn = auth.isAuthenticated ? <li><a href="/" onClick={logoutHandler}>Выход</a></li>:<li><NavLink to="/auth">Вход</NavLink></li>;
    const userPage = auth.isAuthenticated ? <li><NavLink to="/user">Информация</NavLink></li> : '';

    return(
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo">SVG Shop</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Главная</NavLink></li>
                    {userPage}
                    {logBtn}
                </ul>
            </div>
        </nav>
    )
}