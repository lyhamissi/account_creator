import React from 'react';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">BitBank Creator</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/how-it-works">How It Works</a></li>
        <li><a href="/applications">My Applications</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a className="btn-login" href="/login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
