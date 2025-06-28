import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashBoard';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    console.log("You must be logged in!");
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        // Redirect if role is not recognized
        return <Navigate to="/login" replace />; 
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className='container mx-auto flex flex-col md:flex-row gap-6 p-4'>
        <aside className='lg:w-1/5 md:w-1/4 w-full'>
          {renderDashboard()}
        </aside>
        <main className='flex-1 bg-white p-6 rounded-lg shadow-sm'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
