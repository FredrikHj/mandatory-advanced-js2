import React, { useState } from 'react';
import helpComponents from './helpComponents.js';

function MainPage(props) {
  return (
    <div className="page">
      <p className="pageTitle">Huvudsida</p>
      <nav className="navContainer">
        <helpComponents.Navbar/>
      </nav>
    <section id="searchMovie">
      Sök efter en film:
      <input type="text"/>
    </section>
    <table>
      <thead>
        <tr><th>Title</th><th>Director</th><th>Rating</th></tr>
      </thead>
      <tbody>
        <helpComponents.MovieTBody
          pasthroughMovieData={ props.movieListData }
          pasthroughRemoveMovie={ props.removeMovie }
        />
      </tbody>
    </table>
    </div>
  );
}
export default MainPage;
