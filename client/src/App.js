import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {Navbar} from "./components/Navbar";
import 'materialize-css';
import * as M from "materialize-css";




document.addEventListener('DOMContentLoaded', function() {
    const instanse = M.AutoInit();
    const elems = document.querySelectorAll('.materialboxed');
    const ModalImg = M.Materialbox.init(elems);
    const navbar = document.querySelector('.sidenav');
    const Sidenav = M.Sidenav.init(navbar);
    const chips = document.querySelectorAll('.chips');
    const Chips = M.Chips.init(chips);
});


function App() {
    const { login, logout, userId, token, isAdmin} = useAuth()
    const  isAuthenticated = !!token
  const routes = useRoutes(isAdmin, isAuthenticated);
  return (
      <AuthContext.Provider value={{
          login, logout, token, userId, isAuthenticated, isAdmin
      }}>
          <Router>
              { isAuthenticated && isAdmin && <Navbar/>}
                  <div className="container">
                      <div className="App">
                          {routes}
                      </div>
                  </div>
          </Router>
      </AuthContext.Provider>

  );
}

export default App;
