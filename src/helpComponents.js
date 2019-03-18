import React, { useState } from 'react';

// ======================================= The App´s Funktion Components - Help Components =======================================


function MovieTBody(props) {
  console.log(props);
  let incomminMovieData = props.pasthroughMovieData;

  return (
      incomminMovieData.map((obj, countMovie) => {
        countMovie += 1;
        console.log(obj);
        return (
          <tr key={countMovie}><td>{ obj.title }</td><td>{ obj.director }</td><td>{ obj.rating }</td><td><button className="deleteBtn"></button> Edit Details</td></tr>
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
