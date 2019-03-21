import React, { useState } from 'react';

// ======================================= The App´s Funktion Components - Help Components =======================================
function MovieTBody(props) {
  let movieData = props.pasthroughMovieData;
  let removeMovie = props.pasthroughRemoveMovie;
  let countMovie = -1;

  return (
    movieData.map((obj) => {
      countMovie += 1;
      return (
        <tr key={countMovie}><td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td>
        <td><button className="deleteBtn" id={ obj.id } onClick={ removeMovie } value={ countMovie }>Radera filmen</button></td><td value={ countMovie }>Edit</td><td value={ countMovie }>Details</td><td>{ obj.id }</td></tr>
      );
    })
  );
}
function Navbar() {
  return (
    <>
      <p className="navLinks">Huvudsidan</p>
      <p className="navLinks">Lägga till</p>
    </>
  );
}

export default{
  MovieTBody: MovieTBody,
  Navbar: Navbar
}
