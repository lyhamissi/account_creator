import React, { useContext } from 'react';
import { AdminAuthContext } from '../../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import '../../../styles/navbar.css';

const Navbar = () => {
  const { logoutAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <header className="admin-navbar">
      <button onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Navbar;
