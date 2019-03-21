import React, { useState } from 'react';
import helpComponents from './helpComponents.js';

function EditPage() {
  return (
    <div className="page">
      <p className="pageTitle">Editera</p>
      <nav className="navContainer">
        <helpComponents.Navbar/>
      </nav>
    </div>
  );
}
export default EditPage;
