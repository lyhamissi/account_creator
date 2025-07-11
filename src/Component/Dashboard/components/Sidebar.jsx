import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../styles/sidebar.css';
import { FaTachometerAlt, FaClipboardList, FaFileAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>Admin Panel</h2>

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <FaTachometerAlt />
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/posts"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <FaFileAlt />
        Posts
      </NavLink>

      <NavLink
        to="/admin/account-requests"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <FaClipboardList />
        Account Requests
      </NavLink>
    </nav>
  );
};

export default Sidebar;
