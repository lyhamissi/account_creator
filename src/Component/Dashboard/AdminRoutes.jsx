import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminAuthContext } from '../../context/AdminAuthContext';

const AdminRoutes = () => {
  const { adminToken } = useContext(AdminAuthContext);

  return adminToken ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoutes;
