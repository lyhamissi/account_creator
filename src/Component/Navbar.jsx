import React, { useState } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">Russian Walter</div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <li><a href="/home">Home</a></li>
          {/* <li><a href="/how-it-works">How It Works</a></li> */}
          {/* <li><a href="/applications">My Applications</a></li> */}
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a className="btn-login" href="/login">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
