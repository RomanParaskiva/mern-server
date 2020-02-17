import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {AdminNavbar} from "./components/AdminNavbar";
import 'materialize-css';
import * as M from "materialize-css";
import {UserNavbar} from "./components/UserNavbar";




setTimeout(() => {
    const instanse = M.AutoInit();
    const elems = document.querySelectorAll('.materialboxed');
    const ModalImg = M.Materialbox.init(elems);
    const navbar = document.querySelector('.sidenav');
    const Sidenav = M.Sidenav.init(navbar);



}, 10);


function App() {
    const { login, logout, userId, token, isAdmin} = useAuth();
    const  isAuthenticated = !!token;
    const navbar = isAdmin ? <AdminNavbar/> : <UserNavbar/>;
  const routes = useRoutes(isAdmin, isAuthenticated);
  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isAuthenticated, isAdmin
      }}>
          <Router>
              {navbar}
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

