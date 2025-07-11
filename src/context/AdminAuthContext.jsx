import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const loginAdmin = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = res.data;

      if (user.role !== 'admin') return false;

      localStorage.setItem('adminToken', token);
      setAdminToken(token);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
