import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/Navbar';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ padding: '1rem', flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
