import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Russian Walter</h3>
          <p>Create accounts on top banks easily. Bitcoin-powered. Simple. Secure.</p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email:  <a style={{ marginLeft: '0.5rem', display: 'inline' }} href="mailto:russianheisenbergwalter@gmail.com">russianheisenbergwalter@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 BitBank Creator. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
