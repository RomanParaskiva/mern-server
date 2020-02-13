import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router } from 'react-router-dom';
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
  const routes = useRoutes(true,true);
  return (
      <div className="container">
          <Router>
              <div className="App">
                  {routes}
              </div>
          </Router>
      </div>

  );
}

export default App;
