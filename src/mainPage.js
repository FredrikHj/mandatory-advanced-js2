import React, { useState } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import {Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function MainPage(props) {
  let countMovie = -1;
  console.log(props.movieListData);
  let filterList = props.movieListData.filter((movieListData) =>
    {
      console.log(movieListData);
      return movieListData.title.includes(props.searchMovie)
        || movieListData.director.includes(props.searchMovie)
    }
  )
  console.log(filterList);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ props.routerSetting.appName + ' - ' + props.routerSetting.currentPage }</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <p className="navLinks">Huvudsidan</p>
      <p className="navLinks">Lägga till</p>
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
              countMovie += 1;
              return (
                <tr key={countMovie}><td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td>
                <td><button className="deleteBtn" id={ obj.id } onClick={ props.removeMovie } value={ countMovie }>Radera filmen</button></td><td value={ countMovie }>Edit</td><td value={ countMovie }>Details</td><td>{ obj.id }</td></tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}
//style={(props.searchMovie != '') ? {display: 'none'}: null}>
export default MainPage;
