import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-inner">
        <h1 className="about-title">About  Russian Walterr</h1>
        <p className="about-description">
          Russian Walter is a secure and user-friendly platform that simplifies account creation for web applications.
          Whether you're managing a startup or a large platform,  Russian Walter provides fast registration, robust security,
          and seamless integration to help you onboard users with confidence.
        </p>

        <div className="about-features">
          <h2 className="about-subtitle">Why Choose Russian Walter?</h2>
          <ul className="about-list">
            <li> Secure user authentication</li>
            <li> Fast and reliable account creation</li>
            <li> Admin dashboard for account management</li>
            <li> Easy integration with your web app</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
