import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-3" style={{
      backgroundColor: 'rgba(28, 93, 46, 0.6)', // semi-transparent green
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">FlavorFlow</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentPage === 'home' ? 'active text-white' : 'text-light'}`} 
                onClick={() => setCurrentPage('home')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentPage === 'upload' ? 'active text-white' : 'text-light'}`} 
                onClick={() => setCurrentPage('upload')}>
                Upload Recipe
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentPage === 'recipes' ? 'active text-white' : 'text-light'}`} 
                onClick={() => setCurrentPage('recipes')}>
                Recipe
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link ${currentPage === 'about' ? 'active text-white' : 'text-light'}`} 
                onClick={() => setCurrentPage('about')}>
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
