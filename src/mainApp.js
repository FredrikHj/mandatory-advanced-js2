// Kvar att fixa Edit med PUT och redigeringen + React router = stanna kvar vi refresh
import React, { Component } from 'react';
import './movieapi.css';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import MainPage from './mainPage.js';
import AddPage from './addPage.js';
import EditPage from './editPage.js';
import DetailsPage from './detailsPage.js';

let getMoviesList;

// ================================================ The App´s Function Components =================================================
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: true
    }
  }
  render() {
    return (
      <div id="appBody">
        <Router>
          <div id="headLinks">
            <Link to="/"><p>Hem</p></Link>
            <Link to="/Add"><p>Lägga till</p></Link>
          </div>

          <Route exact path="/" component={MainPage} />
          <Route path="/Add" component={AddPage} />
          <Route path="/Edit/:id" component={EditPage} />
          <Route path="/Details/:id" component={DetailsPage} />
        </Router>
      </div>
    );
    if (this.state.redirect === true) return <Redirect to="/"/>;
  }
}

export default App;
