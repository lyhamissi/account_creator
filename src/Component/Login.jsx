import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/AuthForm.css';

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form">
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input type="email" placeholder="Email" required />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
