import React, { useState } from 'react';
import helpComponents from './helpComponents.js';

function AddPage() {
  return (
    <div className="page">
      <p className="pageTitle">Lägga till</p>
        <nav className="navContainer">
          <helpComponents.Navbar/>
        </nav>
    </div>
  );
}
export default AddPage;
