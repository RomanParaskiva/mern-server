import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import * as M from "materialize-css";

export const AdminNavbar = () => {
    const auth = useContext(AuthContext)

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    });

    // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
    // var collapsibleElem = document.querySelector('.collapsible');
    // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    return(
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <a href="/adminka" className="brand-logo">Админка</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/adminka/carousel">Слайдер</NavLink></li>
                        <li><NavLink to="/adminka/new">Новый товар</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                    </ul>
                </div>
            </nav>

            <ul id="slide-out" className="sidenav pt-100">
                <li>
                    <div className="divider"/>
                </li>
                <li><a href="/adminka"><i className="material-icons">cloud</i>Главная</a></li>
                <li>
                    <div className="divider"/>
                </li>
                <li><a href="/adminka/new">Новый товар</a></li>
                <li>
                    <div className="divider"/>
                </li>
            </ul>
        </div>

    )
}