import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import MainApp from './mainApp.js';
import DetailsPage from './detailsPage.js';
import EditPage from './editPage.js';

function MainPage(props) {
  console.log(props);
  let countMovie = -1;
  let filterList = props.movieListData.filter((movieListData) =>
    {
      return movieListData.title.includes(props.searchMovie)
        || movieListData.director.includes(props.searchMovie)
    }
  )

  let getRouterSetting = props.routerSetting;
  return (
    <>
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
      </Helmet>
      <div className="page" style={(props.routerSetting.currentPage != 'Main') ? {display: 'none'} : null}>
        <section id="searchMovie">
          Sök efter en film:
          <input type="text" onChange={ props.sortMovieList }/>
        </section>
        <table>
          <thead>
            <tr><th>Title</th><th>Director</th><th>Rating</th></tr>
          </thead>
          <tbody>
           {
              filterList.map((obj) => {
                console.log(obj);
                countMovie += 1;
                return (
                  <tr key={countMovie}>
                    <td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td>
                    <td>
                      <button className="deleteBtn" id={ obj.id } onClick={ props.removeMovie } value={ countMovie }>Radera filmen</button>
                    </td>
                    <td value={ countMovie }>
                      <Link to={"/Edit/" + obj.id} className="editBtn" id={ obj.id } value={ countMovie } onClick={ props.pushEdit }>Edit</Link>
                    </td>
                    <td value={ countMovie }>
                      <Link to={"/Details/" + obj.id} className="detailsBtn" id={ obj.id } value={ countMovie } onClick={ props.pushDetails }>Details</Link>
                    </td>
                    <td>{ obj.id }</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      <Route path="/Edit/:id" render={(props) => <EditPage {...props}
        routerSetting={ getRouterSetting }
        />}
      />
      <Route path="/Details" render={(props) => <DetailsPage {...props}
        routerSetting={ getRouterSetting }
        />}
      />
      </Router>
    </>
  );
}
export default MainPage;
