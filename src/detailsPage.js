import React, { useState } from 'react';
import helpComponents from './helpComponents.js';

function DetailsPage() {
  return (
    <div className="page">
      <p className="pageTitle">Detaljer</p>
      <nav className="navContainer">
        <helpComponents.Navbar/>
      </nav>
    </div>
  );
}
export default DetailsPage;
