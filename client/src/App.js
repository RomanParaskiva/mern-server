import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {AdminNavbar} from "./components/AdminNavbar";
import 'materialize-css';
import * as M from "materialize-css";
import {UserNavbar} from "./components/UserNavbar";
import Loader from "./components/Loader";




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

  if (!ready) {
      return <Loader/>
  }
  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthenticated, isAdmin
      }}>
          <Router>
              {navbar}
                      <div className="App">
                          {routes}
                      </div>
          </Router>
      </AuthContext.Provider>
  );
}

export default App;

