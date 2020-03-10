import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {Sidenav} from "materialize-css";

export const UserNavbar = () => {
    const auth = useContext(AuthContext)
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
        var sidenav = Sidenav.init(elems);
    });


    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }

    const logBtn = auth.isAuthenticated ? <li><a href="/" className="waves-effect white cyan-text waves-light btn" onClick={logoutHandler}>Logout</a></li>:<li><a className="waves-effect cyan-text white waves-light btn" href="/auth">Sign In / Sign Up</a></li>;
    const userPage = auth.isAuthenticated ? <li><NavLink to="/user">User Info</NavLink></li> : '';

    const paypalBtn = () => {
        window.open('https://www.paypal.com/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700')
    }

    const logoSrc = './images/logo.png'
    return(
        <>
            <nav className="nav_gradient">
                <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                        className="material-icons">menu</i></a>
                    <a href="/" className="brand-logo"><img width="250px" src={require(`${logoSrc}`)}/></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a className="paypal_link" href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works"
                               onClick={paypalBtn}><img
                            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                            border="0" alt="Secured by PayPal"/></a></li>
                        <li><NavLink to="/">Home</NavLink></li>
                        {userPage}
                        {logBtn}
                    </ul>
                </div>
            </nav>
            <ul id="slide-out" className="sidenav cyan pt-100">

                <li><NavLink to="/">Home</NavLink></li>
                {userPage}
                {logBtn}
                <li><a className="paypal_link" href="https://www.paypal.com/webapps/mpp/paypal-popup" title="How PayPal Works"
                       onClick={paypalBtn}><img
                    src="https://www.paypalobjects.com/digitalassets/c/website/marketing/na/us/logo-center/15_nowaccepting_blue_badge.jpg"
                    border="0" alt="Secured by PayPal"/></a></li>
            </ul>
        </>
    )
}