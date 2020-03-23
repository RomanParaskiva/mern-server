import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {AdminNavbar} from "./components/AdminNavbar";
import 'materialize-css';
import * as M from "materialize-css";
import {UserNavbar} from "./components/UserNavbar";
import Loader from "./components/Loader";
import {useHttp} from "./hooks/http.hook";
import {useMessage} from "./hooks/message.hook";
import {CardContext} from "./context/CardContext";




setTimeout(() => {
    M.AutoInit();
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
    const navbar = document.querySelector('.sidenav');
    M.Sidenav.init(navbar);
    var carousel = document.querySelectorAll('.carousel');
    M.Carousel.init(carousel);



}, 10);

function App() {
    const { login, logout, userId, token, isAdmin, ready} = useAuth();
    const  isAuthenticated = !!token;
    const navbar = isAdmin ? <AdminNavbar/> : <UserNavbar/>;
    const routes = useRoutes(isAdmin, isAuthenticated);
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






  if (!ready) {
      return <Loader/>
  }

    if(loading) {
        return <Loader/>
    }
  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthenticated, isAdmin
      }}>
          <CardContext.Provider value={{
              cards: cards
          }}>
          <Router>
              {navbar}
                      <div className="App pt-80">
                          {routes}
                      </div>
          </Router>
          </CardContext.Provider>
      </AuthContext.Provider>
  );
}

export default App;

